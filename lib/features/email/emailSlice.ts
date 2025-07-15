import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { EmailBlock } from "@/types/block"

interface EmailState {
  blocks: EmailBlock[]
  selectedBlock: EmailBlock | null
  previewMode: "desktop" | "mobile"
  isLoading: boolean
  error: string | null
}

const initialState: EmailState = {
  blocks: [],
  selectedBlock: null,
  previewMode: "desktop",
  isLoading: false,
  error: null,
}

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setBlocks: (state, action: PayloadAction<EmailBlock[]>) => {
      state.blocks = action.payload
    },
    addBlock: (state, action: PayloadAction<EmailBlock>) => {
      state.blocks.push(action.payload)
    },
    updateBlock: (state, action: PayloadAction<{ id: string; updates: Partial<EmailBlock> }>) => {
      const { id, updates } = action.payload
      const blockIndex = state.blocks.findIndex((block) => block.id === id)
      if (blockIndex !== -1) {
        state.blocks[blockIndex] = { ...state.blocks[blockIndex], ...updates }
      }
      if (state.selectedBlock?.id === id) {
        state.selectedBlock = { ...state.selectedBlock, ...updates }
      }
    },
    deleteBlock: (state, action: PayloadAction<string>) => {
      state.blocks = state.blocks.filter((block) => block.id !== action.payload)
      if (state.selectedBlock?.id === action.payload) {
        state.selectedBlock = null
      }
    },
    reorderBlocks: (state, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
      const { oldIndex, newIndex } = action.payload
      const [removed] = state.blocks.splice(oldIndex, 1)
      state.blocks.splice(newIndex, 0, removed)
    },
    setSelectedBlock: (state, action: PayloadAction<EmailBlock | null>) => {
      state.selectedBlock = action.payload
    },
    setPreviewMode: (state, action: PayloadAction<"desktop" | "mobile">) => {
      state.previewMode = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setBlocks,
  addBlock,
  updateBlock,
  deleteBlock,
  reorderBlocks,
  setSelectedBlock,
  setPreviewMode,
  setLoading,
  setError,
} = emailSlice.actions

export default emailSlice.reducer
