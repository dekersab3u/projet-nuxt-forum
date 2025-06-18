import { defineWrappedResponseHandler } from '~/server/utils/mysql'

export default defineWrappedResponseHandler(async (event) => {
    const sujetId = event.context.params?.sujetId
    const query = getQuery(event)
    const page = parseInt(query.page as string || '1')
    const limit = 20
    const offset = (page - 1) * limit

    const db = event.context.mysql

    const [messages]: any = await db.execute(`
    SELECT m.*, u.username
    FROM messages m
    JOIN users u ON m.user_id = u.id
    WHERE m.sujet_id = ?
    ORDER BY m.created_at ASC
    LIMIT ? OFFSET ?
  `, [sujetId, limit, offset])

    return { messages }
})
