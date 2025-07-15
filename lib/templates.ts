import { db } from "./firebase"
import { collection, doc, setDoc, getDoc, getDocs, query, where, deleteDoc } from "firebase/firestore"
import type { EmailBlock } from "@/types/block"

export interface Template {
  id: string
  name: string
  blocks: EmailBlock[]
  userId: string
  createdAt: Date
  updatedAt: Date
}

export async function saveTemplate(userId: string, name: string, blocks: EmailBlock[]): Promise<string> {
  const templateId = `template_${Date.now()}`
  const templateRef = doc(db, "templates", templateId)

  const template: Omit<Template, "id"> = {
    name,
    blocks,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  await setDoc(templateRef, template)
  return templateId
}

export async function loadTemplate(templateId: string): Promise<Template | null> {
  const templateRef = doc(db, "templates", templateId)
  const templateSnap = await getDoc(templateRef)

  if (templateSnap.exists()) {
    return { id: templateSnap.id, ...templateSnap.data() } as Template
  }

  return null
}

export async function getUserTemplates(userId: string): Promise<Template[]> {
  const templatesRef = collection(db, "templates")
  const q = query(templatesRef, where("userId", "==", userId))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Template[]
}

export async function deleteTemplate(templateId: string): Promise<void> {
  const templateRef = doc(db, "templates", templateId)
  await deleteDoc(templateRef)
}
