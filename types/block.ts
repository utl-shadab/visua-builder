export interface EmailBlock {
  id: string
  type: "text" | "button" | "image" | "spacer" | "divider"
  content?: string
  text?: string // For button text
  alt?: string // For image alt text
  styles?: {
    fontSize?: string
    color?: string
    backgroundColor?: string
    textAlign?: "left" | "center" | "right"
    fontWeight?: string
    borderRadius?: string
    width?: string
    height?: string
    borderColor?: string
    borderWidth?: string
  }
}
