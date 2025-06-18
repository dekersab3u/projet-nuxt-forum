import { defineWrappedResponseHandler } from '~/server/utils/mysql'

export default defineWrappedResponseHandler(async (event) => {
    const forumId = event.context.params?.id
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
  `, [forumId])

    return { sujets }
})

/*import { db } from '~/server/db/client'
import { forums } from '~/server/db/schema'
import { eq } from 'drizzle-orm'
import { defineWrappedResponseHandler } from '~/server/utils/mysql'


export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const forum = await db.query.forums.findFirst({ where: eq(forums.id, Number(id)) })
    return forum
})*/
