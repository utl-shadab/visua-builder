"use client"

import type React from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Trash2 } from "lucide-react"
import type { EmailBlock } from "@/types/block"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/lib/hooks"
import { setSelectedBlock, deleteBlock } from "@/lib/features/email/emailSlice"

interface SortableBlockProps {
  block: EmailBlock
  isSelected: boolean
}

export function SortableBlock({ block, isSelected }: SortableBlockProps) {
  const dispatch = useAppDispatch()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleSelect = () => {
    dispatch(setSelectedBlock(block))
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(deleteBlock(block.id))
  }

  const renderBlockContent = () => {
    switch (block.type) {
      case "text":
        return (
          <div
            style={{
              fontSize: block.styles?.fontSize,
              color: block.styles?.color,
              textAlign: block.styles?.textAlign,
              fontWeight: block.styles?.fontWeight,
            }}
          >
            {block.content}
          </div>
        )
      case "button":
        return (
          <button
            style={{
              backgroundColor: block.styles?.backgroundColor,
              color: block.styles?.color,
              borderRadius: block.styles?.borderRadius,
              padding: "12px 24px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {block.text}
          </button>
        )
      case "image":
        return (
          <img
            src={block.content || "/placeholder.svg"}
            alt={block.alt || "Image"}
            style={{ width: block.styles?.width, maxWidth: "100%" }}
            className="rounded"
          />
        )
      case "spacer":
        return (
          <div
            style={{ height: block.styles?.height }}
            className="bg-muted border border-dashed border-border flex items-center justify-center text-muted-foreground text-sm"
          >
            Spacer ({block.styles?.height})
          </div>
        )
      case "divider":
        return (
          <hr
            style={{
              borderColor: block.styles?.borderColor,
              borderWidth: block.styles?.borderWidth,
              borderStyle: "solid",
            }}
          />
        )
      default:
        return <div>Unknown block type</div>
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group relative p-4 border rounded-lg cursor-pointer transition-all
        ${isSelected ? "border-primary bg-primary/10" : "border-border hover:border-border/80"}
        ${isDragging ? "opacity-50" : ""}
      `}
      onClick={handleSelect}
    >
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-accent rounded"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="flex-1">{renderBlockContent()}</div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
