"use client"
import { DndContext, type DragEndEvent, DragOverlay, type DragStartEvent } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Sidebar } from "./sidebar"
import { EditorCanvas } from "./editor-canvas"
import { Preview } from "./preview"
import { PropertiesPanel } from "./properties-panel"
import { Navbar } from "./navbar"
import { MobileNavbar } from "./mobile-navbar"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { addBlock, reorderBlocks } from "@/lib/features/email/emailSlice"
import type { EmailBlock } from "@/types/block"
import { useState } from "react"

export function EmailBuilder() {
  const dispatch = useAppDispatch()
  const { blocks, selectedBlock, previewMode, isLoading } = useAppSelector((state) => state.email)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    if (active.data.current?.type === "new-block") {
      const newBlock: EmailBlock = {
        id: `block-${Date.now()}`,
        type: active.data.current.blockType,
        content: getDefaultContent(active.data.current.blockType),
        styles: getDefaultStyles(active.data.current.blockType),
      }

      if (active.data.current.blockType === "button") {
        newBlock.text = "Click Here"
      }

      dispatch(addBlock(newBlock))
    } else {
      const oldIndex = blocks.findIndex((block) => block.id === active.id)
      const newIndex = blocks.findIndex((block) => block.id === over.id)

      if (oldIndex !== newIndex) {
        dispatch(reorderBlocks({ oldIndex, newIndex }))
      }
    }
  }

  const getDefaultContent = (type: string): string => {
    switch (type) {
      case "text":
        return "Your text here"
      case "button":
        return "#"
      case "image":
        return "/placeholder.svg?height=200&width=400"
      default:
        return ""
    }
  }

  const getDefaultStyles = (type: string) => {
    switch (type) {
      case "text":
        return { fontSize: "16px", color: "#000000", textAlign: "left" as const }
      case "button":
        return { backgroundColor: "#3b82f6", color: "#ffffff", borderRadius: "6px" }
      case "spacer":
        return { height: "20px" }
      case "divider":
        return { borderColor: "#e5e7eb", borderWidth: "1px" }
      default:
        return {}
    }
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Desktop Navbar */}
      <div className="mobile-hidden">
        <Navbar />
      </div>

      {/* Mobile Navbar */}
      <div className="desktop-hidden">
        <MobileNavbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </div>

      <div className="flex-1 flex overflow-hidden">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {/* Desktop Layout */}
          <div className="mobile-hidden flex w-full">
            <Sidebar />

            <div className="flex-1 flex">
              <div className="flex-1 p-6">
                <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                  <EditorCanvas />
                </SortableContext>
              </div>

              <div className="w-96 border-l border-border">
                <Preview />
              </div>
            </div>

            <PropertiesPanel />
          </div>

          {/* Mobile Layout */}
          <div className="desktop-hidden flex flex-col w-full">
            {isMobileMenuOpen && (
              <div className="fixed inset-0 z-50 bg-background">
                <Sidebar isMobile />
              </div>
            )}

            <div className="flex-1 p-4">
              <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                <EditorCanvas />
              </SortableContext>
            </div>

            {previewMode && (
              <div className="h-1/2 border-t border-border">
                <Preview />
              </div>
            )}
          </div>

          <DragOverlay>
            {activeId ? (
              <div className="bg-card p-4 rounded-lg shadow-xl border-2 border-primary opacity-90">
                <div className="text-foreground text-sm">Dragging component...</div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-foreground mt-2">Loading...</p>
          </div>
        </div>
      )}
    </div>
  )
}
