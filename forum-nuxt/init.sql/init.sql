-- Utilisateurs
INSERT INTO utilisateurs (nom, email, mot_de_passe, role) VALUES
('Admin', 'admin@example.com', '$2b$10$Y71sB16XqDkNqRCplv9IM.4bp38tPz3bg/1U7ZhXxg7kppx7os.7q', 'admin'), -- mot de passe : admin
('Alice', 'alice@example.com', '$2b$10$5NRjM0AGaQZJ02PE8knvu.f3smq0V6b4QqPJDaqts7B32JgAfK19W', 'user'), -- mot de passe : alice123
('Bob', 'bob@example.com', '$2b$10$qR5cwRzcsfbKZ0.XbPOwpeC9ZEvV5CAaNaaWBgGk9N1X/o9iUhDS2', 'user');   -- mot de passe : bob123

-- Forums
INSERT INTO forums (titre, description) VALUES
('Forum Général', 'Discussion générale sur tous les sujets'),
('Forum Développement', 'Discussions techniques et projets de développement');

-- Sujets
INSERT INTO sujets (titre, utilisateur_id, forum_id) VALUES
('Bienvenue sur le forum !', 1, 1),
('Quel est votre éditeur de code préféré ?', 2, 2),
('Besoin d’aide pour un bug Vue.js', 3, 2);

-- Messages
INSERT INTO messages (contenu, sujet_id, utilisateur_id) VALUES
('Bienvenue à tous dans ce nouveau forum communautaire !', 1, 1),
('J’utilise VSCode, je trouve ça super léger.', 2, 2),
('J’aime bien WebStorm pour ses outils intégrés.', 2, 3),
('Peux-tu partager ton code ? On pourra t’aider plus facilement.', 3, 1),
('Le bug venait d’un composant mal importé, merci !', 3, 3);
