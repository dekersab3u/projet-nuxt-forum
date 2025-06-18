import { defineWrappedResponseHandler } from '~/server/utils/mysql'
import bcrypt from 'bcrypt'

export default defineWrappedResponseHandler(async (event) => {
    const body = await readBody(event)
    const { username, email, password } = body
    const db = event.context.mysql

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
        username,
        email,
        hashedPassword,
    ])

    return { success: true }
})
