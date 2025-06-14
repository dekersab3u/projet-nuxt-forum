import { db } from '~/server/db/client'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const rows = await db.execute('SELECT * FROM utilisateurs WHERE email = ?', [body.email])
    const user = Array.isArray(rows[0]) ? rows[0][0] : null

    if (!user || !(await compare(body.password, user.mot_de_passe))) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.id, role: user.role }, 'secret', { expiresIn: '2h' })

    setCookie(event, 'token', token, { httpOnly: true, maxAge: 7200 })

    return { success: true }
})
