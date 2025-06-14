-- init.sql

DROP TABLE IF EXISTS messages, sujets, forums, utilisateurs;

CREATE TABLE utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  mot_de_passe VARCHAR(255) NOT NULL,
  role ENUM('utilisateur', 'admin') DEFAULT 'utilisateur',
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE forums (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(100) NOT NULL,
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sujets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  forum_id INT NOT NULL,
  auteur_id INT NOT NULL,
  titre VARCHAR(200) NOT NULL,
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_dernier_message DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (forum_id) REFERENCES forums(id) ON DELETE CASCADE,
  FOREIGN KEY (auteur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sujet_id INT NOT NULL,
  auteur_id INT NOT NULL,
  contenu TEXT NOT NULL,
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sujet_id) REFERENCES sujets(id) ON DELETE CASCADE,
  FOREIGN KEY (auteur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);

-- Compte admin par défaut
INSERT INTO utilisateurs (nom, email, mot_de_passe, role)
VALUES ('admin', 'admin@forum.local', '$2b$10$9F2OVaK4F8UuEqxAwKg9Me9Wy8ZoRZHgugz9y1byLl35OqEw5Xw.C', 'admin');

-- Le mot de passe correspond à "admin" hashé avec bcrypt (cost = 10)
