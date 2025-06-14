import { db } from '~/server/db/client'
import { hash } from 'bcrypt'
import { utilisateurs } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const hashed = await hash(body.password, 10)

    const result = await db.insert(utilisateurs).values({
        nom: body.nom,
        email: body.email,
        mot_de_passe: hashed,
    })

    return { success: true, id: result.insertId }
})
