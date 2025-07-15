"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableBlock } from "./sortable-block"
import { Plus } from "lucide-react"
import { useAppSelector } from "@/lib/hooks"

export function EditorCanvas() {
  const { blocks, selectedBlock } = useAppSelector((state) => state.email)
  const { setNodeRef, isOver } = useDroppable({
    id: "editor-canvas",
  })

  return (
    <div className="h-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground mb-2">Email Canvas</h2>
        <p className="text-sm text-muted-foreground">Drag elements from the sidebar to build your email template</p>
      </div>

      <div
        ref={setNodeRef}
        className={`
          min-h-96 bg-card rounded-lg border-2 border-dashed p-6 transition-all
          ${isOver ? "border-primary bg-primary/10" : "border-border"}
          ${blocks.length === 0 ? "flex items-center justify-center" : ""}
        `}
      >
        {blocks.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <Plus className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-lg mb-2">Start Building Your Email</p>
            <p className="text-sm">Drag components from the sidebar to create your template</p>
          </div>
        ) : (
          <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {blocks.map((block) => (
                <SortableBlock key={block.id} block={block} isSelected={selectedBlock?.id === block.id} />
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  )
}
