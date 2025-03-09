import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { usePostUploadFile } from "@/controllers/API/queries/files/use-post-upload-file";
import useFileSizeValidator from "@/shared/hooks/use-file-size-validator";
import useAlertStore from "@/stores/alertStore";
import useFlowStore from "@/stores/flowStore";
import { useUtilityStore } from "@/stores/utilityStore";
import { useEffect, useRef, useState } from "react";
import ShortUniqueId from "short-unique-id";
import {
  ALLOWED_IMAGE_INPUT_EXTENSIONS,
  CHAT_INPUT_PLACEHOLDER,
  CHAT_INPUT_PLACEHOLDER_SEND,
  FS_ERROR_TEXT,
  SN_ERROR_TEXT,
} from "../../../../../constants/constants";
import useFlowsManagerStore from "../../../../../stores/flowsManagerStore";
import {
  ChatInputType,
  FilePreviewType,
} from "../../../../../types/components";
import FilePreview from "../fileComponent/components/file-preview";
import ButtonSendWrapper from "./components/button-send-wrapper";
import TextAreaWrapper from "./components/text-area-wrapper";
import UploadFileButton from "./components/upload-file-button";
import useAutoResizeTextArea from "./hooks/use-auto-resize-text-area";
import useFocusOnUnlock from "./hooks/use-focus-unlock";
import { Frame } from "react95";
export default function ChatInput({
  sendMessage,
  inputRef,
  noInput,
  files,
  setFiles,
  isDragging,
}: ChatInputType): JSX.Element {
  const currentFlowId = useFlowsManagerStore((state) => state.currentFlowId);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setErrorData = useAlertStore((state) => state.setErrorData);
  const { validateFileSize } = useFileSizeValidator(setErrorData);
  const stopBuilding = useFlowStore((state) => state.stopBuilding);
  const isBuilding = useFlowStore((state) => state.isBuilding);
  const chatValue = useUtilityStore((state) => state.chatValueStore);

  useFocusOnUnlock(isBuilding, inputRef);
  useAutoResizeTextArea(chatValue, inputRef);

  const { mutate } = usePostUploadFile();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement> | ClipboardEvent,
  ) => {
    let file: File | null = null;

    if ("clipboardData" in event) {
      const items = event.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          const blob = items[i].getAsFile();
          if (blob) {
            file = blob;
            break;
          }
        }
      }
    } else {
      const fileInput = event.target as HTMLInputElement;
      file = fileInput.files?.[0] ?? null;
    }
    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (!validateFileSize(file)) {
        return;
      }

      if (
        !fileExtension ||
        !ALLOWED_IMAGE_INPUT_EXTENSIONS.includes(fileExtension)
      ) {
        setErrorData({
          title: "Error uploading file",
          list: [FS_ERROR_TEXT, SN_ERROR_TEXT],
        });
        return;
      }

      const uid = new ShortUniqueId();
      const id = uid.randomUUID(10);

      const type = file.type.split("/")[0];

      setFiles((prevFiles) => [
        ...prevFiles,
        { file, loading: true, error: false, id, type },
      ]);

      mutate(
        { file, id: currentFlowId },
        {
          onSuccess: (data) => {
            setFiles((prev) => {
              const newFiles = [...prev];
              const updatedIndex = newFiles.findIndex((file) => file.id === id);
              newFiles[updatedIndex].loading = false;
              newFiles[updatedIndex].path = data.file_path;
              return newFiles;
            });
          },
          onError: (error) => {
            setFiles((prev) => {
              const newFiles = [...prev];
              const updatedIndex = newFiles.findIndex((file) => file.id === id);
              newFiles[updatedIndex].loading = false;
              newFiles[updatedIndex].error = true;
              return newFiles;
            });
            setErrorData({
              title: "Error uploading file",
              list: [error.response?.data?.detail],
            });
          },
        },
      );
    }

    if ("target" in event && event.target instanceof HTMLInputElement) {
      event.target.value = "";
    }
  };

  useEffect(() => {
    document.addEventListener("paste", handleFileChange);
    return () => {
      document.removeEventListener("paste", handleFileChange);
    };
  }, [handleFileChange, currentFlowId, isBuilding]);

  const send = () => {
    sendMessage({
      repeat: 1,
      files: files.map((file) => file.path ?? "").filter((file) => file !== ""),
    });
    setFiles([]);
  };

  const checkSendingOk = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    return (
      event.key === "Enter" &&
      !isBuilding &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    );
  };

  const classNameFilePreview = `flex w-full items-center gap-2 py-2 overflow-auto custom-scroll`;

  const handleButtonClick = () => {
    fileInputRef.current!.click();
  };

  const handleDeleteFile = (file: FilePreviewType) => {
    setFiles((prev: FilePreviewType[]) => prev.filter((f) => f.id !== file.id));
    // TODO: delete file on backend
  };

  if (noInput) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center gap-3   border border-input   p-2 py-4">
          {!isBuilding ? (
            <Button
              data-testid="button-send"
              className=" "
              onClick={() => {
                sendMessage({
                  repeat: 1,
                });
              }}
            >
              Run Flow
            </Button>
          ) : (
            <Button
              onClick={stopBuilding}
              data-testid="button-stop"
              unstyled
              className="form-modal-send-button cursor-pointer bg-silver text-foreground"
            >
              <div className="flex items-center gap-2   text-[14px] font-medium">
                Stop
                <Loading className="h-[16px] w-[16px]" />
              </div>
            </Button>
          )}

          <p className="  ">
            Add a{" "}
            Chat Input
            component to your flow to send messages.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">

      <div>
        <div className="flex w-full items-end justify-between mb-2">
            <div className={isBuilding ? "cursor-not-allowed" : ""}>
              <UploadFileButton
               isBuilding={isBuilding}
               fileInputRef={fileInputRef}
               handleFileChange={handleFileChange}
               handleButtonClick={handleButtonClick}
              />
            </div>

        </div>
      </div>

      <Frame variant="field" className="flex w-full flex-col h-[120px] bg-white focus:border-[1.75px] has-[:focus]:border-primary">
        <TextAreaWrapper
                  isBuilding={isBuilding}
                  checkSendingOk={checkSendingOk}
                  send={send}
                  noInput={noInput}
                  chatValue={chatValue}
                  CHAT_INPUT_PLACEHOLDER={CHAT_INPUT_PLACEHOLDER}
                  CHAT_INPUT_PLACEHOLDER_SEND={CHAT_INPUT_PLACEHOLDER_SEND}
                  inputRef={inputRef}
                  files={files}
                  isDragging={isDragging}
        />
       
      </Frame>

      <div className={classNameFilePreview}>
          {files.map((file) => (
            <FilePreview
              error={file.error}
              file={file.file}
              loading={file.loading}
              key={file.id}
              onDelete={() => {
                handleDeleteFile(file);
              }}
            />
          ))}
        </div>

      <div className="mt-1 ml-auto">
            <ButtonSendWrapper
               send={send}
               noInput={noInput}
               chatValue={chatValue}
               files={files}
            />
          </div>

          
    </div>
  );
}
