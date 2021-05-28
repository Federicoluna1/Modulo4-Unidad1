const {connection} = require('../app');
const util = require('util');


const qy = util.promisify(connection.query).bind(connection);


//Crear equipo
const equiposPost = async (req, res) => {
    try{
        if (!req.body.nombre) {
            res.status(400).send('El equipo debe tener un nombre');
        }

        let query = 'SELECT id FROM equipos WHERE nombre = ?';
        let respuesta = await  qy(query, [req.body.nombre.toUpperCase()]);

        if (respuesta.length > 0) {
            res.status(400).send('¡Ya existe el equipo!');
        };

        const queryPost = 'INSERT INTO equipos (nombre) VALUE (?)';
        const respuestaPost = await qy(queryPost, [req.body.nombre.toUpperCase()]);
            res.status(200).send({'respuesta': respuestaPost});
        
    }
    catch(e){
        console.error(e.message);
            res.status(500).send({'Error': e.message});
    }
};


//Buscar todos los equipos
const equiposGet = async (req, res) => {
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


//Buscar equipos por ID
const equiposGetById = async (req, res) => {
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

//Actualizar equipo 
const equiposPutById = async (req, res) => {  
    try {
        if (!req.body.nombre || !req.params.id) {
            res.status(400).send ('Faltan datos');

        let query = 'SELECT * FROM equipos WHERE nombre = ? AND id <>?';
        let respuesta = await qy (query, [req.body.nombre, req.params.id])
        
        if (respuesta.length > 0 ){
            res.status(400).send ('El nombre del equipo ya existe')
        }
       
        const queryPutById =  'UPDATE equipos SET nombre =? WHERE id = ?';
        const respuestaPutById = await qy (queryPutById [req.body.nombre, rec.params.id]) ;
            res.status(200).send({'respuesta': respuestaPutById}); 
    }
    }   
    catch(e){
        console.error(e.message);
            res.status(500).send({'Error': e.message});
    }
}; 


//Eliminar equipo
const equiposDeleteById = async (req, res) => {
    try {
        let query = 'SELECT * FROM jugadores WHERE categoria_id = ?';
        let respuesta = await qy (query, [req.params.id]);

        if (respuesta.length > 0 ) {
            res.status(400).send('Este equipo tiene jugadores asociados, no se puede borrar');
    }
        const queryDeleteById =  'DELETE FROM equipos WHERE id = ?'; 
        const respuestaDeleteById = await qy (queryDeleteById, [req.params.id]) ;
            res.status(200).send({'respuesta': respuestaDeleteById});
    }
    catch(e) {
        console.error(e.message);
            res.status(500).send({"Error": e.message});
    }
};  
    
//Exporto las rutas
module.exports={
    equiposPost, equiposGet, equiposGetById, equiposPutById, equiposDeleteById
}