import { defineWrappedResponseHandler } from '~/server/utils/mysql'

export default defineWrappedResponseHandler(async (event) => {
    const id = event.context.params?.id
    const body = await readBody(event)
    const { userId, role, newContent } = body

    const db = event.context.mysql

    // On récupère l'auteur du message
    const [rows]: any = await db.execute(
        'SELECT utilisateur_id FROM messages WHERE id = ?',
        [id]
    )

    const message = rows[0]
    if (!message) return { error: 'Message introuvable' }

    // Vérification des droits
    if (message.utilisateur_id !== userId && role !== 'admin') {
        return { error: 'Non autorisé à modifier ce message' }
    }

    // Mise à jour du contenu
    await db.execute(
        'UPDATE messages SET contenu = ?, updated_at = NOW() WHERE id = ?',
        [newContent, id]
    )

    return { success: true }
})
