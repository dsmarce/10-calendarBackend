const express= require('express');
//const {check}= require('express-validator');
const { validateJWT} = require('../middlewares/jwtValidator');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { isDate } = require('../helpers/isDate');

const router= express.Router();

//todas las rutas que esten abajo de esta linea tiene que pasar la validacion del JWT
router.use(validateJWT);

//obtener eventos
router.get('/', getEventos);

//crear nuevo evento
router.post('/',
[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de fin es obligatoria').custom(isDate),
    fieldsValidator
], crearEvento);

//actualizar evento
router.put('/:id', actualizarEvento);

//borrar evento
router.delete('/:id', eliminarEvento);

module.exports=router;