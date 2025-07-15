"use client"

import { useDraggable } from "@dnd-kit/core"
import { Type, Square, ImageIcon, Minus, Space, Layout, AlignLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { toggleTheme } from "@/lib/features/theme/themeSlice"

const BLOCK_CATEGORIES = [
  {
    title: "Layout",
    blocks: [{ type: "section", label: "Section", icon: Layout }],
  },
  {
    title: "Text",
    blocks: [
      { type: "text", label: "Text", icon: Type },
      { type: "heading", label: "Heading", icon: AlignLeft },
    ],
  },
  {
    title: "Media",
    blocks: [{ type: "image", label: "Image", icon: ImageIcon }],
  },
  {
    title: "Components",
    blocks: [
      { type: "button", label: "Button", icon: Square },
      { type: "spacer", label: "Spacer", icon: Space },
      { type: "divider", label: "Divider", icon: Minus },
    ],
  },
]

function DraggableBlock({ type, label, icon: Icon }: { type: string; label: string; icon: any }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `draggable-${type}`,
    data: {
      type: "new-block",
      blockType: type,
    },
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        flex items-center gap-3 p-3 bg-card rounded-lg border border-border cursor-grab 
        hover:bg-accent hover:border-accent-foreground/20 transition-all
        ${isDragging ? "opacity-50" : ""}
      `}
    >
      <Icon className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  )
}

interface SidebarProps {
  isMobile?: boolean
}

export function Sidebar({ isMobile = false }: SidebarProps) {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.theme.theme)

  return (
    <div className={`${isMobile ? "w-full h-full" : "w-72"} bg-card border-r border-border p-4 overflow-y-auto`}>
      {isMobile && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Elements</h2>
          <Button variant="ghost" size="sm" onClick={() => dispatch(toggleTheme())}>
            {theme === "dark" ? "☀️" : "🌙"}
          </Button>
        </div>
      )}

      {!isMobile && (
        <div className="flex items-center gap-2 mb-6">
          <Mail className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Elements</h2>
        </div>
      )}

      <div className="space-y-6">
        {BLOCK_CATEGORIES.map((category) => (
          <div key={category.title}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {category.title}
            </h3>
            <div className="space-y-2">
              {category.blocks.map((block) => (
                <DraggableBlock key={block.type} type={block.type} label={block.label} icon={block.icon} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
