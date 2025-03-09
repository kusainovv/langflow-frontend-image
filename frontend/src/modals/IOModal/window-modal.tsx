"use client"

import * as React from "react"
import { Resizable } from "re-resizable"
import { Minus, Square, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/utils"
import { Frame } from "react95"

interface WindowsModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children?: React.ReactNode
  className?: string
  defaultSize?: { width: number; height: number }
  defaultPosition?: { x: number; y: number }
  maxContentHeight?: number
  maxHeight?: number
  maxWidth?: number // New prop for maximum width
}

export function WindowsModal({
  isOpen,
  onClose,
  title,
  children,
  className,
  defaultSize = { width: 600, height: 400 },
  defaultPosition = { x: 100, y: 100 },
  maxContentHeight,
  maxHeight,
  maxWidth,
}: WindowsModalProps) {
  const [isMaximized, setIsMaximized] = React.useState(false)
  const [position, setPosition] = React.useState(defaultPosition)
  const [size, setSize] = React.useState(defaultSize)
  const [prevSize, setPrevSize] = React.useState(defaultSize)
  const [prevPosition, setPrevPosition] = React.useState(defaultPosition)
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 })

  const windowRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  // Calculate the non-content height (title bar + status bar)
  const nonContentHeight = 56 // titlebar(40) + statusbar(16)

  // Calculate maximum heights based on props
  const effectiveMaxContentHeight = maxContentHeight || (maxHeight ? maxHeight - nonContentHeight : undefined)
  const effectiveMaxHeight = maxHeight || (maxContentHeight ? maxContentHeight + nonContentHeight : undefined)

  // Ensure initial size doesn't exceed maximum dimensions
  React.useEffect(() => {
    const newSize = { ...size }
    let shouldUpdate = false

    if (effectiveMaxHeight && size.height > effectiveMaxHeight) {
      newSize.height = effectiveMaxHeight
      shouldUpdate = true
    }

    if (maxWidth && size.width > maxWidth) {
      newSize.width = maxWidth
      shouldUpdate = true
    }

    if (shouldUpdate) {
      setSize(newSize)
    }
  }, [effectiveMaxHeight, maxWidth, size])

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        const newX = e.clientX - dragOffset.x
        const newY = e.clientY - dragOffset.y

        const maxX = window.innerWidth - (size.width || 0)
        const maxY = window.innerHeight - (size.height || 0)

        const constrainedX = Math.min(Math.max(0, newX), maxX)
        const constrainedY = Math.min(Math.max(0, newY), maxY)

        setPosition({ x: constrainedX, y: constrainedY })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.body.style.cursor = "default"
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "move"
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "default"
    }
  }, [isDragging, dragOffset, isMaximized, size.width, size.height])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMaximized) return

    const targetElement = e.target as HTMLElement
    if (targetElement.closest("button") || targetElement.getAttribute("role") === "button") {
      return
    }

    const rect = windowRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
    }
  }

  const handleResize = (
    e: MouseEvent | TouchEvent,
    direction: string,
    ref: HTMLElement,
    d: { width: number; height: number },
  ) => {
    const newSize = { ...size }
    const newPosition = { ...position }

    // Handle width resizing
    if (direction.includes("left")) {
      const newWidth = size.width + d.width
      if (newWidth >= 300) {
        // Minimum width
        const constrainedWidth = maxWidth ? Math.min(newWidth, maxWidth) : newWidth
        const widthDiff = constrainedWidth - size.width
        newSize.width = constrainedWidth
        newPosition.x = position.x - widthDiff
      }
    } else if (direction.includes("right")) {
      const newWidth = size.width + d.width
      newSize.width = maxWidth ? Math.min(newWidth, maxWidth) : Math.max(300, newWidth) // Ensure minimum width
    }

    // Handle height resizing
    if (direction.includes("top")) {
      const newHeight = size.height + d.height
      if (newHeight >= 200) {
        // Minimum height
        const constrainedHeight = effectiveMaxHeight ? Math.min(newHeight, effectiveMaxHeight) : newHeight
        const heightDiff = constrainedHeight - size.height
        newSize.height = constrainedHeight
        newPosition.y = position.y - heightDiff
      }
    } else if (direction.includes("bottom")) {
      const newHeight = size.height + d.height
      newSize.height = effectiveMaxHeight ? Math.min(newHeight, effectiveMaxHeight) : Math.max(200, newHeight) // Ensure minimum height
    }

    setSize(newSize)
    setPosition(newPosition)
  }

  if (!isOpen) return null

  const handleMaximize = () => {
    if (!isMaximized) {
      setPrevSize(size)
      setPrevPosition(position)
      const maxWindowHeight = effectiveMaxHeight || window.innerHeight
      const maxWindowWidth = maxWidth || window.innerWidth
      setSize({
        width: maxWindowWidth,
        height: maxWindowHeight,
      })
      setPosition({ x: 0, y: 0 })
    } else {
      setSize(prevSize)
      setPosition(prevPosition)
    }
    setIsMaximized(!isMaximized)
  }

  const handleMinimize = () => {
    // In a real app, this would minimize to taskbar
    console.log("Minimize clicked")
  }

  return (
    <Frame
        variant="window"
      ref={windowRef}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 50,
        transition: isDragging ? "none" : "box-shadow 0.2s ease",
      }}
      className={cn(isDragging && "shadow-2xl")}
    >
      <Resizable
        size={size}
        onResize={handleResize}
        enable={{
          top: !isMaximized,
          right: !isMaximized,
          bottom: !isMaximized,
          left: !isMaximized,
          topRight: !isMaximized,
          bottomRight: !isMaximized,
          bottomLeft: !isMaximized,
          topLeft: !isMaximized,
        }}
        className={cn("flex flex-col bg-light-gray border shadow-lg", className)}
        // minWidth={500}
        minHeight={600}
        minWidth={800}
        maxWidth={800}
        // maxWidth={maxWidth}
        maxHeight={effectiveMaxHeight}
        handleStyles={{
          top: { cursor: "n-resize" },
          right: { cursor: "e-resize" },
          bottom: { cursor: "s-resize" },
          left: { cursor: "w-resize" },
          topRight: { cursor: "ne-resize" },
          bottomRight: { cursor: "se-resize" },
          bottomLeft: { cursor: "sw-resize" },
          topLeft: { cursor: "nw-resize" },
        }}
      >
        {/* Window Title Bar */}
        <div
          className={cn(
            "select-none flex items-center justify-between border-b bg-gradient-to-b from-muted/50 to-muted py-1 px-4",
            isDragging && "cursor-move",
            !isDragging && "cursor-default hover:bg-muted/80",
            "bg-gradient-to-r from-navy-gradient-start to-navy-gradient-end text-white"
          )}
          onMouseDown={handleMouseDown}
        >
          <div className="text-sm font-medium">{title}</div>
          <div className="flex items-center gap-2">
            {/* <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-background/80" onClick={handleMinimize}>
              <Minus className="h-3 w-3" />
              <span className="sr-only">Minimize</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-background/80" onClick={handleMaximize}>
              <Square className="h-3 w-3" />
              <span className="sr-only">Maximize</span>
            </Button> */}
            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-destructive" onClick={onClose}>
              <X className="h-3 w-3" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>

        {/* Window Content */}
        <div
          ref={contentRef}
          className="flex-1 overflow-auto"
          style={{
            maxHeight: effectiveMaxContentHeight ? `${effectiveMaxContentHeight}px` : undefined,
          }}
        >
          {children}
        </div>

        {/* Window Status Bar */}
        {/* <div className="h-6 border-t bg-muted/50 px-4 py-1">
          <div className="text-xs text-muted-foreground">
            Position: {Math.round(position.x)}, {Math.round(position.y)} | Size: {Math.round(size.width)} ×{" "}
            {Math.round(size.height)} |{maxWidth ? ` Max Width: ${maxWidth}` : ""}
            {maxHeight ? ` Max Height: ${maxHeight}` : ""}
            {maxContentHeight ? ` Max Content: ${maxContentHeight}` : ""}
          </div>
        </div> */}
      </Resizable>
    </Frame>
  )
}

