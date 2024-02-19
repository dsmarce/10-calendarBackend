const express= require('express');
const {check}= require('express-validator');

const router= express.Router();

const { crearUsuario, loginUsuario, revalidarToken}= require('../controllers/auth');
const { fieldsValidator } = require('../middlewares/fieldsValidator');

router.post(
    '/',
    //middlewares
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La clave es obligatoria. De 6 caracteres').isLength({min:6}),
        fieldsValidator
    ],
    loginUsuario
);

router.post(
    '/new', 
    //middlewares
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La clave es obligatoria. De 6 caracteres').isLength({min:6}),
        fieldsValidator
    ],
    crearUsuario
);

router.get('/renew', revalidarToken);

module.exports= router;