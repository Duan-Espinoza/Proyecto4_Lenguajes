-- Tabla "Usuarios"
CREATE TABLE Usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nickname VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla "Partidas"
CREATE TABLE Partidas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  codigo VARCHAR(255) NOT NULL,
  tipo_juego VARCHAR(255) NOT NULL,
  tematica VARCHAR(255) NOT NULL,
  duracion INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla "Partidas_Usuarios"
CREATE TABLE Partidas_Usuarios (
  partida_id INT,
  usuario_id INT,
  FOREIGN KEY (partida_id) REFERENCES Partidas(id),
  FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
  PRIMARY KEY (partida_id, usuario_id)
);

-- Consultas CRUD para la tabla "Usuarios"

-- Crear un nuevo usuario
INSERT INTO Usuarios (nickname) VALUES ('NombreDeUsuario');

-- Obtener todos los usuarios
SELECT * FROM Usuarios;

-- Obtener un usuario por su ID
SELECT * FROM Usuarios WHERE id = 1;

-- Actualizar el nickname de un usuario
UPDATE Usuarios SET nickname = 'NuevoNickname' WHERE id = 1;

-- Eliminar un usuario por su ID
DELETE FROM Usuarios WHERE id = 1;

-- Consultas CRUD para la tabla "Partidas"

-- Crear una nueva partida
INSERT INTO Partidas (codigo, tipo_juego, tematica, duracion) VALUES ('CodigoPartida', 'TipoJuego', 'Tematica', 10);

-- Obtener todas las partidas
SELECT * FROM Partidas;

-- Obtener una partida por su ID
SELECT * FROM Partidas WHERE id = 1;

-- Actualizar la duración de una partida
UPDATE Partidas SET duracion = 15 WHERE id = 1;

-- Eliminar una partida por su ID
DELETE FROM Partidas WHERE id = 1;
