import { defineWrappedResponseHandler } from '~/server/utils/mysql'

export default defineWrappedResponseHandler(async (event) => {
    const sujetId = event.context.params?.id
    const db = event.context.mysql

    const [rows]: any = await db.execute(
        'SELECT * FROM messages WHERE sujet_id = ? ORDER BY created_at ASC',
        [sujetId]
    )

    return { messages: rows }
})


/*import { db } from '~/server/db/client'
import { defineWrappedResponseHandler } from '~/server/utils/mysql'
import { messages, utilisateurs } from '~/server/db/schema'
import { eq } from 'drizzle-orm'
export default defineEventHandler(async (event) => {
    const sujetId = Number(getRouterParam(event, 'id'))
    const result = await db
        .select({
            id: messages.id,
            contenu: messages.contenu,
            date_creation: messages.date_creation,
            utilisateur: {
                id: utilisateurs.id,
                nom: utilisateurs.nom
            }
        })
        .from(messages)
        .innerJoin(utilisateurs, eq(messages.utilisateur_id, utilisateurs.id))
        .where(eq(messages.sujet_id, sujetId))
        .orderBy(messages.date_creation.asc())
    return result
})*/
