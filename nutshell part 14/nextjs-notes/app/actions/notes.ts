'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'

export async function createNote(formData: FormData) {
  const content = formData.get('content')

  if (typeof content !== 'string' || content.trim().length === 0) {
    return
  }

  const important = formData.get('important') === 'on'

  await prisma.note.create({
    data: {
      content: content.trim(),
      important,
    },
  })

  revalidatePath('/')
}

export async function toggleImportant(id: string) {
  const note = await prisma.note.findUnique({ where: { id } })

  if (!note) {
    return
  }

  await prisma.note.update({
    where: { id },
    data: { important: !note.important },
  })

  revalidatePath('/')
  revalidatePath(`/notes/${id}`)
}

export async function deleteNote(id: string) {
  await prisma.note.delete({ where: { id } })
  revalidatePath('/')
  redirect('/')
}
