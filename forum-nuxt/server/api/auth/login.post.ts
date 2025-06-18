import { defineWrappedResponseHandler } from '~/server/utils/mysql'
import bcrypt from 'bcrypt'

export default defineWrappedResponseHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body
    const db = event.context.mysql

    const [rows]: any = await db.execute('SELECT * FROM users WHERE email = ?', [email])
    const user = rows[0]

    if (!user) {
        return { error: 'Utilisateur non trouvé' }
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
        return { error: 'Mot de passe invalide' }
    }

    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    }
})
