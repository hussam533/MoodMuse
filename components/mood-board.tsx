"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Download, Plus, Trash, Upload } from "lucide-react"
import { useRef, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { useToast } from "./ui/use-toast"
import html2canvas from "html2canvas"

type MoodBoardItem = {
  id: string
  type: "image" | "text" | "color"
  content: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  rotation: number
  zIndex: number
}

const sampleItems: MoodBoardItem[] = [
  {
    id: "1",
    type: "image",
    content: "/tranquil-sea.png",
    position: { x: 50, y: 50 },
    size: { width: 200, height: 150 },
    rotation: -5,
    zIndex: 1,
  },
  {
    id: "2",
    type: "text",
    content: "Feeling peaceful today",
    position: { x: 300, y: 100 },
    size: { width: 200, height: 50 },
    rotation: 0,
    zIndex: 2,
  },
  {
    id: "3",
    type: "color",
    content: "#e0f2fe",
    position: { x: 100, y: 250 },
    size: { width: 100, height: 100 },
    rotation: 5,
    zIndex: 0,
  },
  {
    id: "4",
    type: "image",
    content: "/vibrant-floral-display.png",
    position: { x: 400, y: 200 },
    size: { width: 150, height: 150 },
    rotation: 10,
    zIndex: 1,
  },
  {
    id: "5",
    type: "text",
    content: "Gratitude & Joy",
    position: { x: 200, y: 350 },
    size: { width: 150, height: 40 },
    rotation: -3,
    zIndex: 2,
  },
]

export function MoodBoard() {
  const { toast } = useToast()
  const [items, setItems] = useState<MoodBoardItem[]>(sampleItems)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [currentTab, setCurrentTab] = useState("edit")
  const boardRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragStart = (id: string) => {
    setActiveItem(id)
  }

  const handleDrag = (id: string, deltaX: number, deltaY: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              position: {
                x: item.position.x + deltaX,
                y: item.position.y + deltaY,
              },
            }
          : item,
      ),
    )
  }

  const handleDragEnd = () => {
    setActiveItem(null)
  }

  const handleResize = (id: string, width: number, height: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              size: {
                width: Math.max(50, width),
                height: Math.max(50, height),
              },
            }
          : item,
      ),
    )
  }

  const handleRotate = (id: string, rotation: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              rotation: item.rotation + rotation,
            }
          : item,
      ),
    )
  }

  const handleAddImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const newItem: MoodBoardItem = {
          id: Date.now().toString(),
          type: "image",
          content: event.target?.result as string,
          position: { x: 100, y: 100 },
          size: { width: 200, height: 150 },
          rotation: 0,
          zIndex: items.length + 1,
        }
        setItems((prevItems) => [...prevItems, newItem])
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddText = () => {
    const newItem: MoodBoardItem = {
      id: Date.now().toString(),
      type: "text",
      content: "Double click to edit",
      position: { x: 150, y: 150 },
      size: { width: 200, height: 50 },
      rotation: 0,
      zIndex: items.length + 1,
    }
    setItems((prevItems) => [...prevItems, newItem])
  }

  const handleAddColor = () => {
    const colors = [
      "#f0f9ff", // blue-50
      "#e0f2fe", // blue-100
      "#bae6fd", // blue-200
      "#fdf2f8", // pink-50
      "#fce7f3", // pink-100
      "#fbcfe8", // pink-200
      "#f5f3ff", // violet-50
      "#ede9fe", // violet-100
      "#ddd6fe", // violet-200
    ]

    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const newItem: MoodBoardItem = {
      id: Date.now().toString(),
      type: "color",
      content: randomColor,
      position: { x: 200, y: 200 },
      size: { width: 100, height: 100 },
      rotation: 0,
      zIndex: 0,
    }
    setItems((prevItems) => [...prevItems, newItem])
  }

  const handleTextEdit = (id: string, newContent: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              content: newContent,
            }
          : item,
      ),
    )
  }

  const handleDeleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const handleExport = async () => {
    if (boardRef.current) {
      try {
        const canvas = await html2canvas(boardRef.current)
        const image = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.href = image
        link.download = "moodboard.png"
        link.click()

        toast({
          title: "Mood board exported!",
          description: "Your mood board has been saved as an image.",
        })
      } catch (error) {
        toast({
          title: "Export failed",
          description: "There was an error exporting your mood board.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-4">
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="edit" className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleAddImage}>
              <Upload className="h-4 w-4 mr-1" />
              Add Image
            </Button>
            <Input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            <Button variant="outline" size="sm" onClick={handleAddText}>
              <Plus className="h-4 w-4 mr-1" />
              Add Text
            </Button>
            <Button variant="outline" size="sm" onClick={handleAddColor}>
              <Plus className="h-4 w-4 mr-1" />
              Add Color Block
            </Button>
          </div>

          <div
            ref={boardRef}
            className="relative w-full h-[500px] border rounded-md bg-white dark:bg-gray-900 overflow-hidden"
            style={{
              backgroundImage: "url('/placeholder.svg?key=91ccj')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {items.map((item) => (
              <MoodBoardItemComponent
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                onDragStart={() => handleDragStart(item.id)}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                onResize={handleResize}
                onRotate={handleRotate}
                onTextEdit={handleTextEdit}
                onDelete={handleDeleteItem}
                isEditMode={currentTab === "edit"}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <div
            className="relative w-full h-[500px] border rounded-md bg-white dark:bg-gray-900 overflow-hidden"
            style={{
              backgroundImage: "url('/placeholder.svg?key=lhdjz')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="absolute"
                style={{
                  left: `${item.position.x}px`,
                  top: `${item.position.y}px`,
                  width: `${item.size.width}px`,
                  height: `${item.size.height}px`,
                  transform: `rotate(${item.rotation}deg)`,
                  zIndex: item.zIndex,
                }}
              >
                {item.type === "image" && (
                  <img
                    src={item.content || "/placeholder.svg"}
                    alt="Mood board item"
                    className="w-full h-full object-cover rounded-md shadow-md"
                  />
                )}
                {item.type === "text" && (
                  <div className="w-full h-full flex items-center justify-center text-center p-2 bg-white/80 dark:bg-gray-800/80 rounded-md shadow-md">
                    {item.content}
                  </div>
                )}
                {item.type === "color" && (
                  <div className="w-full h-full rounded-md shadow-md" style={{ backgroundColor: item.content }} />
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MoodBoardItemComponentProps {
  item: MoodBoardItem
  isActive: boolean
  isEditMode: boolean
  onDragStart: () => void
  onDrag: (id: string, deltaX: number, deltaY: number) => void
  onDragEnd: () => void
  onResize: (id: string, width: number, height: number) => void
  onRotate: (id: string, rotation: number) => void
  onTextEdit: (id: string, newContent: string) => void
  onDelete: (id: string) => void
}

function MoodBoardItemComponent({
  item,
  isActive,
  isEditMode,
  onDragStart,
  onDrag,
  onDragEnd,
  onResize,
  onRotate,
  onTextEdit,
  onDelete,
}: MoodBoardItemComponentProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(item.content)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode) return

    e.preventDefault()
    onDragStart()
    setIsDragging(true)
    setStartPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isEditMode) return

    const deltaX = e.clientX - startPos.x
    const deltaY = e.clientY - startPos.y
    onDrag(item.id, deltaX, deltaY)
    setStartPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    if (!isEditMode) return

    setIsDragging(false)
    onDragEnd()
  }

  const handleTextDoubleClick = () => {
    if (!isEditMode) return

    if (item.type === "text") {
      setIsEditing(true)
    }
  }

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditContent(e.target.value)
  }

  const handleTextInputBlur = () => {
    setIsEditing(false)
    onTextEdit(item.id, editContent)
  }

  const handleTextInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false)
      onTextEdit(item.id, editContent)
    }
  }

  return (
    <motion.div
      className={cn(
        "absolute cursor-move",
        isActive && isEditMode && "ring-2 ring-primary",
        item.type === "image" && "rounded-md overflow-hidden shadow-md",
        item.type === "text" && "bg-white/80 dark:bg-gray-800/80 rounded-md shadow-md",
        item.type === "color" && "rounded-md shadow-md",
      )}
      style={{
        left: `${item.position.x}px`,
        top: `${item.position.y}px`,
        width: `${item.size.width}px`,
        height: `${item.size.height}px`,
        transform: `rotate(${item.rotation}deg)`,
        zIndex: isActive ? 100 : item.zIndex,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {item.type === "image" && (
        <img
          src={item.content || "/placeholder.svg"}
          alt="Mood board item"
          className="w-full h-full object-cover"
          draggable={false}
        />
      )}
      {item.type === "text" && !isEditing && (
        <div
          className="w-full h-full flex items-center justify-center text-center p-2"
          onDoubleClick={handleTextDoubleClick}
        >
          {item.content}
        </div>
      )}
      {item.type === "text" && isEditing && (
        <Input
          value={editContent}
          onChange={handleTextInputChange}
          onBlur={handleTextInputBlur}
          onKeyDown={handleTextInputKeyDown}
          autoFocus
          className="w-full h-full text-center"
        />
      )}
      {item.type === "color" && <div className="w-full h-full rounded-md" style={{ backgroundColor: item.content }} />}

      {isActive && isEditMode && (
        <>
          <Button
            variant="destructive"
            size="icon"
            className="absolute -top-3 -right-3 h-6 w-6"
            onClick={() => onDelete(item.id)}
          >
            <Trash className="h-3 w-3" />
          </Button>

          <div
            className="absolute -bottom-3 -right-3 h-6 w-6 bg-primary rounded-full cursor-se-resize"
            onMouseDown={(e) => {
              e.stopPropagation()
              const startX = e.clientX
              const startY = e.clientY
              const startWidth = item.size.width
              const startHeight = item.size.height

              const handleResizeMove = (moveEvent: MouseEvent) => {
                const deltaX = moveEvent.clientX - startX
                const deltaY = moveEvent.clientY - startY
                onResize(item.id, startWidth + deltaX, startHeight + deltaY)
              }

              const handleResizeUp = () => {
                document.removeEventListener("mousemove", handleResizeMove)
                document.removeEventListener("mouseup", handleResizeUp)
              }

              document.addEventListener("mousemove", handleResizeMove)
              document.addEventListener("mouseup", handleResizeUp)
            }}
          />

          <div
            className="absolute top-1/2 -right-3 h-6 w-6 bg-primary rounded-full cursor-e-resize transform -translate-y-1/2"
            onMouseDown={(e) => {
              e.stopPropagation()
              const startX = e.clientX
              const startWidth = item.size.width

              const handleResizeMove = (moveEvent: MouseEvent) => {
                const deltaX = moveEvent.clientX - startX
                onResize(item.id, startWidth + deltaX, item.size.height)
              }

              const handleResizeUp = () => {
                document.removeEventListener("mousemove", handleResizeMove)
                document.removeEventListener("mouseup", handleResizeUp)
              }

              document.addEventListener("mousemove", handleResizeMove)
              document.addEventListener("mouseup", handleResizeUp)
            }}
          />
        </>
      )}
    </motion.div>
  )
}
