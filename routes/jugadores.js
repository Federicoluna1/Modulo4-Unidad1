const {connection} = require('../app');
const util = require('util');


const qy = util.promisify(connection.query).bind(connection);


//Agregar jugadores
const jugadoresPost = async (req, res) => {
    try{
        if (!req.body.nombre) {
            res.status(400).send('El equipo debe tener un nombre');
        }

        let query = 'SELECT id FROM equipos WHERE nombre = ?';
        let respuesta = await  qy(query, [req.body.nombre.toUpperCase()]);

        if (respuesta.length > 0 ) {
            res.status(400).send('¡Ya existe el equipo!');
        };

        let queryPost = 'INSERT INTO equipos (nombre) VALUE (?)';
        let respuestaPost = await qy(queryPost, [req.body.nombre.toUpperCase()]);
            res.status(200).send({'respuesta': respuestaPost.insertId});
        
    }
    catch(e){
        console.error(e.message);
            res.status(500).send({'Error': e.message});
    }
};


//Buscar todos los jugadores
const jugadoresGet = async (req, res) => {
    try{
        const query = 'SELECT * FROM equipos';
        const respuesta =  await qy(query);
            res.status(200).send({"Respuesta": respuesta});

    }
    catch(e){
        console.error(e.message);
            res.status(500).send({'Error': e.message});
    }
};


//Buscar jugadores por ID
const jugadoresGetById = async (req, res) => {
    try{
        let query = 'SELECT * FROM equipos WHERE id = ?';  
        let respuesta =  await qy(query, [req.params.id]);

        if (respuesta.length == 0 ) {
            res.status(404).send ('No existe el equipo');
        };
        
            res.status(200).send({"Respuesta": respuesta});

    }
    catch(e){
        console.error(e.message);
            res.status(500).send({'Error': e.message});
    }
};


//Buscar jugadores por equipo
const jugadoresGetByEquipos = async (req, res) => {  
    try {
        
        let query = 'SELECT * FROM equipos WHERE id = ?';
        let respuesta = await qy (query, [req.params.id])
        
        if (respuesta.length == 0 ){
            res.status(404).send ('El equipo no existe')
        }
       
        let queryGetByEquipos =  'SELECT * FROM equipos WHERE id_jugadores =?';
        let respuestaGetByEquipos = await qy (queryGetByEquipos [rec.params.id]) ;
            res.status(200).send({'respuesta': respuestaGetByEquipos}); 
    } 
    catch(e){
        console.error(e.message);
            res.status(500).send({'Error': e.message});
    }
}; 

//Buscar jugadores por equipo y por ID
const jugadoresGetByEquiposAndId = async (req, res) => {  
    try {
        let query = 'SELECT * FROM equipos WHERE id = ?';
        let respuesta = await qy (query, [req.params.id])
        
        if (respuesta.length == 0 ){
            res.status(404).send('El equipo no existe')
        }

        let queryGetByEquiposAndId = 'SELECT * FROM id_jugadores =? AND WHERE id = ?';
        let respuestaGetByEquiposAndId = await qy (queryGetByEquiposAndId, [req.params.id_jugadores, req.params.id])
            res.status(200).send({'respuesta': respuestaGetByEquiposAndId}); 
    }  
    catch(e){
        console.error(e.message);
            res.status(500).send({'Error': e.message});
    }
}; 


//Actualizar jugador
const jugadoresPutById = async (req, res) => {  
    try {
        if (!req.body.nombre || !req.body.apellido) {
            res.status(400).send('Falta enviar el nombre y apellido');

        let query = 'SELECT * FROM equipos WHERE nombre = ? AND id <>?';
        let respuesta = await qy (query, [req.body.nombre, req.params.id])
        
        if (respuesta.length > 0 ){
            res.status(400).send('El nombre del equipo ya existe')
        }
       
        let queryPutById =  'UPDATE equipos SET nombre =? WHERE id = ?';        
        let respuestaPutById = await qy (queryPutById [req.body.nombre, rec.params.id]) ;
            res.status(200).send({'respuesta': respuestaPutById}); 
    }
    }   
    catch(e){
        console.error(e.message);
            res.status(500).send({'Error': e.message});
    }
}; 


//Eliminar jugador
const jugadoresDeleteById = async (req, res) => {
    try {
        let query = 'SELECT * FROM jugadores WHERE categoria_id = ?';
        let respuesta = await qy (query, [req.params.id]);

        if (respuesta.length > 0 ) {
            res.status(400).send('Este equipo tiene jugadores asociados, no se puede borrar');
    }
        query =  'DELETE FROM equipos WHERE id = ?'; 
        respuesta = await qy (query, [req.params.id]) ;
            res.status(200).send({'respuesta': respuesta});
    }
    catch(e) {
        console.error(e.message);
            res.status(500).send({"Error": e.message});
    }
};  
    
//Exporto las rutas
module.exports={
    jugadoresPost, jugadoresGet, jugadoresGetById, jugadoresGetByEquipos, jugadoresGetByEquiposAndId, jugadoresPutById, jugadoresDeleteById
}