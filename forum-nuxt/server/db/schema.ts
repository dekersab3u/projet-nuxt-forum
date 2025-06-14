import {
    mysqlTable,
    serial,
    varchar,
    text,
    datetime,
    int,
    index,
    uniqueIndex,
} from 'drizzle-orm/mysql-core'

// =========================
// Table Utilisateurs
// =========================
export const utilisateurs = mysqlTable(
    'utilisateurs',
    {
        id: serial('id').primaryKey(),
        nom: varchar('nom', { length: 255 }).notNull(),
        email: varchar('email', { length: 255 }).notNull(),
        mot_de_passe: varchar('mot_de_passe', { length: 255 }).notNull(),
        role: varchar('role', { length: 50 }).notNull().default('user'), // 'user' ou 'admin'
        createdAt: datetime('created_at').defaultNow(),
    },
    (utilisateur) => ({
        emailIndex: uniqueIndex('email_idx').on(utilisateur.email),
    })
)

// =========================
// Table Forums
// =========================
export const forums = mysqlTable(
    'forums',
    {
        id: serial('id').primaryKey(),
        titre: varchar('titre', { length: 255 }).notNull(),
        description: text('description'),
        createdAt: datetime('created_at').defaultNow(),
    },
    (forum) => ({
        titreIndex: uniqueIndex('titre_idx').on(forum.titre),
    })
)

// =========================
// Table Sujets
// =========================
export const sujets = mysqlTable(
    'sujets',
    {
        id: serial('id').primaryKey(),
        titre: varchar('titre', { length: 255 }).notNull(),
        utilisateurId: int('utilisateur_id').notNull(),
        forumId: int('forum_id').notNull(),
        createdAt: datetime('created_at').defaultNow(),
        updatedAt: datetime('updated_at').defaultNow().onUpdateNow(),
    },
    (sujet) => ({
        forumIndex: index('sujet_forum_idx').on(sujet.forumId),
        utilisateurIndex: index('sujet_user_idx').on(sujet.utilisateurId),
    })
)

// =========================
// Table Messages
// =========================
export const messages = mysqlTable(
    'messages',
    {
        id: serial('id').primaryKey(),
        contenu: text('contenu').notNull(),
        sujetId: int('sujet_id').notNull(),
        utilisateurId: int('utilisateur_id').notNull(),
        createdAt: datetime('created_at').defaultNow(),
        updatedAt: datetime('updated_at').defaultNow().onUpdateNow(),
    },
    (message) => ({
        sujetIndex: index('message_sujet_idx').on(message.sujetId),
        utilisateurIndex: index('message_user_idx').on(message.utilisateurId),
    })
)