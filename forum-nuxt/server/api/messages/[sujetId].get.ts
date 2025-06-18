import { defineWrappedResponseHandler } from '~/server/utils/mysql'

export default defineWrappedResponseHandler(async (event) => {
    const sujetId = event.context.params?.sujetId
    const db = event.context.mysql

    const [messages]: any = await db.execute(`
    SELECT m.*, u.username
    FROM messages m
    JOIN users u ON m.user_id = u.id
    WHERE m.sujet_id = ?
    ORDER BY m.created_at ASC
  `, [sujetId])

    return { messages }
})

/*import { db } from '~/server/db/client'
import { messages } from '~/server/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const sujetId = event.context.params?.sujetId
    if (!sujetId) {
        throw createError({ statusCode: 400, statusMessage: 'Sujet ID manquant' })
    }

    const results = await db
        .select()
        .from(messages)
        .where(eq(messages.sujetId, Number(sujetId)))
        .orderBy(messages.createdAt)

    return results
})*/
