import { defineWrappedResponseHandler } from '~/server/utils/mysql'

export default defineWrappedResponseHandler(async (event) => {
    const forumId = event.context.params?.id
    const query = getQuery(event)
    const page = parseInt(query.page as string || '1')
    const limit = 20
    const offset = (page - 1) * limit

    const db = event.context.mysql

    const [sujets]: any = await db.execute(`
    SELECT s.*, u.username,
      (SELECT username FROM messages m JOIN users u2 ON m.user_id = u2.id
        WHERE m.sujet_id = s.id ORDER BY m.created_at DESC LIMIT 1) AS last_author,
      (SELECT created_at FROM messages m2
        WHERE m2.sujet_id = s.id ORDER BY m2.created_at DESC LIMIT 1) AS last_date
    FROM sujets s
    JOIN users u ON s.user_id = u.id
    WHERE s.forum_id = ?
    ORDER BY last_date DESC
    LIMIT ? OFFSET ?
  `, [forumId, limit, offset])

    return { sujets }
})
