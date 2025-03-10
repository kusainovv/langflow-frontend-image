import LangflowLogo from "@/assets/LangflowLogo.svg?react";
import ChainLogo from "@/assets/logo.svg?react";
import { TextEffectPerChar } from "@/components/ui/textAnimation";
import { ENABLE_NEW_LOGO } from "@/customization/feature-flags";
import { track } from "@/customization/utils/analytics";
import { useMessagesStore } from "@/stores/messagesStore";
import { useUtilityStore } from "@/stores/utilityStore";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import useTabVisibility from "../../../../shared/hooks/use-tab-visibility";
import useFlowsManagerStore from "../../../../stores/flowsManagerStore";
import useFlowStore from "../../../../stores/flowStore";
import { ChatMessageType } from "../../../../types/chat";
import { chatViewProps } from "../../../../types/components";
import FlowRunningSqueleton from "../flow-running-squeleton";
import ChatInput from "./chatInput/chat-input";
import useDragAndDrop from "./chatInput/hooks/use-drag-and-drop";
import { useFileHandler } from "./chatInput/hooks/use-file-handler";
import ChatMessage from "./chatMessage/chat-message";
import moment from 'moment';
import { Frame } from "react95";

const MemoizedChatMessage = memo(ChatMessage, (prevProps, nextProps) => {
  return (
    prevProps.chat.message === nextProps.chat.message &&
    prevProps.chat.id === nextProps.chat.id &&
    prevProps.chat.session === nextProps.chat.session &&
    prevProps.chat.content_blocks === nextProps.chat.content_blocks &&
    prevProps.chat.properties === nextProps.chat.properties &&
    prevProps.lastMessage === nextProps.lastMessage
  );
});

export default function ChatView({
  sendMessage,
  visibleSession,
  focusChat,
  closeChat,
}: chatViewProps): JSX.Element {
  const flowPool = useFlowStore((state) => state.flowPool);
  const inputs = useFlowStore((state) => state.inputs);
  const currentFlowId = useFlowsManagerStore((state) => state.currentFlowId);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessageType[] | undefined>(
    undefined,
  );
  const messages = useMessagesStore((state) => state.messages);
  const nodes = useFlowStore((state) => state.nodes);
  const chatInput = inputs.find((input) => input.type === "ChatInput");
  const chatInputNode = nodes.find((node) => node.id === chatInput?.id);
  const displayLoadingMessage = useMessagesStore(
    (state) => state.displayLoadingMessage,
  );

  function transformTo12HourFormat(utcTimestamp) {
    return moment.utc(utcTimestamp).local().format('h:mm a');
  }


  const isBuilding = useFlowStore((state) => state.isBuilding);

  const inputTypes = inputs.map((obj) => obj.type);
  const updateFlowPool = useFlowStore((state) => state.updateFlowPool);
  const setChatValueStore = useUtilityStore((state) => state.setChatValueStore);
  const isTabHidden = useTabVisibility();

  //build chat history
  useEffect(() => {
    const messagesFromMessagesStore: ChatMessageType[] = messages
      .filter(
        (message) =>
          message.flow_id === currentFlowId &&
          (visibleSession === message.session_id || visibleSession === null),
      )
      .map((message) => {
        let files = message.files;
        // Handle the "[]" case, empty string, or already parsed array
        if (Array.isArray(files)) {
          // files is already an array, no need to parse
        } else if (files === "[]" || files === "") {
          files = [];
        } else if (typeof files === "string") {
          try {
            files = JSON.parse(files);
          } catch (error) {
            console.error("Error parsing files:", error);
            files = [];
          }
        }
        return {
          isSend: message.sender === "User",
          message: message.text,
          sender_name: message.sender_name,
          files: files,
          id: message.id,
          timestamp: transformTo12HourFormat(message.timestamp),
          session: message.session_id,
          edit: message.edit,
          background_color: message.background_color || "",
          text_color: message.text_color || "",
          content_blocks: message.content_blocks || [],
          category: message.category || "",
          properties: message.properties || {},
        };
      });
    // const finalChatHistory = [...messagesFromMessagesStore].sort((a, b) => {
    //   return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    // });
    const finalChatHistory = messagesFromMessagesStore;

    if (messages.length === 0 && !isBuilding && chatInputNode && isTabHidden) {
      setChatValueStore(
        chatInputNode.data.node.template["input_value"].value ?? "",
      );
    } else {
      isTabHidden ? setChatValueStore("") : null;
    }

    setChatHistory(finalChatHistory);
  }, [flowPool, messages, visibleSession]);
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, []);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
    // trigger focus on chat when new session is set
  }, [focusChat]);

  function updateChat(
    chat: ChatMessageType,
    message: string,
    stream_url?: string,
  ) {
    chat.message = message;
    if (chat.componentId)
      updateFlowPool(chat.componentId, {
        message,
        sender_name: chat.sender_name ?? "Bot",
        sender: chat.isSend ? "User" : "Machine",
      });
  }

  const { files, setFiles, handleFiles } = useFileHandler(currentFlowId);
  const [isDragging, setIsDragging] = useState(false);

  const { dragOver, dragEnter, dragLeave } = useDragAndDrop(setIsDragging);

  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
    setIsDragging(false);
  };

  const flowRunningSkeletonMemo = useMemo(() => <FlowRunningSqueleton />, []);

  return (
    <div
    className="flex h-full w-full m-auto flex-col"
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={onDrop}
    >
      <Frame variant="field"  ref={messagesRef} className="bg-white h-[250px] w-full mb-0 mt-0 p-2 shadow-field chat-message-div">
        {chatHistory &&
          (isBuilding || chatHistory?.length > 0 ? (
            <>
              {chatHistory?.map((chat, index) => <div key={index} className="mb-4 w-full">
                  <div className="flex items-center gap-x-2 text-lg font-bold text-blue-500">
                    <p className="m-0">{chat.sender_name}{" "}</p>
                    <span className="text-gray-400">({chat.timestamp})</span>
                  </div>

                <div className="ml-0">
                  <MemoizedChatMessage
                    chat={chat}
                    lastMessage={chatHistory.length - 1 === index}
                    key={`${chat.id}-${index}`}
                    updateChat={updateChat}
                    closeChat={closeChat}
                  />
                </div>
              </div>)}
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              Empty
              {/* <div className="flex flex-col items-center justify-center gap-4 p-8">
                {ENABLE_NEW_LOGO ? (
                  <LangflowLogo
                    title="Langflow logo"
                    className="h-10 w-10 scale-[1.5]"
                  />
                ) : (
                  <ChainLogo
                    title="Langflow logo"
                    className="h-10 w-10 scale-[1.5]"
                  />
                )}
                <div className="flex flex-col items-center justify-center">
                  <h3 className="mt-2 pb-2 text-2xl font-semibold text-primary">
                    New chat
                  </h3>
                  <p
                    className="text-lg text-muted-foreground"
                    data-testid="new-chat-text"
                  >
                    <TextEffectPerChar>
                      Test your flow with a chat prompt
                    </TextEffectPerChar>
                  </p>
                </div>
              </div> */}
            </div>
          ))}
        <div
        className={
          displayLoadingMessage
              ? "w-full max-w-[768px] py-4 word-break-break-word md:w-5/6"
              : ""
          }
          ref={ref}
        >
          {displayLoadingMessage &&
            !(chatHistory?.[chatHistory.length - 1]?.category === "error") &&
            flowRunningSkeletonMemo}
        </div>
      </Frame>

      <div className="m-auto mt-auto mb-0 !w-full md:w-5/6">
        <ChatInput
          noInput={!inputTypes.includes("ChatInput")}
          sendMessage={({ repeat, files }) => {
            sendMessage({ repeat, files });
            track("Playground Message Sent");
          }}
          inputRef={ref}
          files={files}
          setFiles={setFiles}
          isDragging={isDragging}
        />
      </div>
    </div>
  );
}
