const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.json());

const puerto = 3000


//Conexion con Base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'planteles'
});


//Error en la conexion
connection.connect((error)=>{
    if(error) {
        throw error;
    }
    console.log ('Conexión con base de datos mysql establecida');
});;


exports.connection = connection;


//Rutas importadas 
const {equiposPost, equiposGet, equiposGetById, equiposPutById, equiposDeleteById} = require('./routes/equipos')
const {jugadoresPost, jugadoresGet, jugadoresGetById, jugadoresGetByEquipos, jugadoresGetByEquiposAndId, jugadoresPutById, jugadoresDeleteById} = require('./routes/jugadores')


//Requests de Equipos
app.post('/equipos',equiposPost);
app.get('/equipos',equiposGet);
app.get('/equipos/:id',equiposGetById);
app.put('/equipos/:id', equiposPutById);
app.delete('/equipos/:id', equiposDeleteById);


//Requests de Jugadores
app.post('/jugadores', jugadoresPost);
app.get('/jugadores', jugadoresGet);
app.get('/jugadores/:id', jugadoresGetById);
app.get('/jugadores/:id/equipos', jugadoresGetByEquipos);
app.get('/jugadores/:id/equipos/:id', jugadoresGetByEquiposAndId);
app.put('/jugadores/:id', jugadoresPutById);
app.delete('/jugadores/:id', jugadoresDeleteById);


app.listen (3000, ()=>{
    console.log ('Servidor escuchando en el puerto 3000')
});
        
