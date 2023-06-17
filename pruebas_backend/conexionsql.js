const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'tu_base_de_datos',
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Ejemplo de consulta para insertar un nuevo usuario
const newUser = {
  nickname: 'jugador1',
};

connection.query('INSERT INTO Usuarios SET ?', newUser, (err, result) => {
  if (err) {
    console.error('Error al insertar el nuevo usuario:', err);
  } else {
    console.log('Nuevo usuario insertado con éxito');
  }
});

// Ejemplo de consulta para obtener los usuarios unidos a una partida
const partidaId = 1;

connection.query(
  'SELECT Usuarios.nickname FROM Usuarios INNER JOIN Partidas_Usuarios ON Usuarios.id = Partidas_Usuarios.usuario_id WHERE Partidas_Usuarios.partida_id = ?',
  partidaId,
  (err, results) => {
    if (err) {
      console.error('Error al obtener los usuarios unidos a la partida:', err);
    } else {
      console.log('Usuarios unidos a la partida:', results);
    }
  }
);

// Cerrar la conexión a la base de datos al finalizar
connection.end();
