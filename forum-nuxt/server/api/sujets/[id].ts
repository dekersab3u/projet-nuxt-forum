import { defineWrappedResponseHandler } from '~/server/utils/mysql'

export default defineWrappedResponseHandler(async (event) => {
    const sujetId = event.context.params?.id
    const db = event.context.mysql

    const [rows]: any = await db.execute(
        'SELECT * FROM sujets WHERE id = ?',
        [sujetId]
    )

    return { sujet: rows[0] }
})

