import { defineWrappedResponseHandler } from '~/server/utils/mysql'

export default defineWrappedResponseHandler(async (event) => {
    const body = await readBody(event)
    const { sujetId, userId, content } = body
    const db = event.context.mysql

    await db.execute(
        'INSERT INTO messages (sujet_id, user_id, content) VALUES (?, ?, ?)',
        [sujetId, userId, content]
    )

    return { success: true }
})


/*import { db } from '~/server/db'
import { messages } from '~/server/db/schema'
import { broadcast } from '~/server/ws'
import { getUserFromSession } from '~/server/utils/auth'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
    const user = await getUserFromSession(event)
    if (!user) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
    }

    const body = await readBody(event)
    const schema = z.object({
        sujetId: z.number(),
        contenu: z.string().min(1),
    })

    const { sujetId, contenu } = schema.parse(body)

    const [inserted] = await db
        .insert(messages)
        .values({ sujetId, auteurId: user.id, contenu })
        .returning()

    broadcast('new-message', {
        message: {
            id: inserted.id,
            contenu,
            auteur: user.username,
            createdAt: inserted.createdAt,
        },
        sujetId,
    })

    return { success: true }
})*/
