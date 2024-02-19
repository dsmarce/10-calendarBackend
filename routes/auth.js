const express= require('express');
const {check}= require('express-validator');

const router= express.Router();

const { crearUsuario, loginUsuario, revalidarToken}= require('../controllers/auth')

router.post(
    '/',
    //middlewares
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La clave es obligatoria. De 6 caracteres').isLength({min:6})
    ],
    loginUsuario
);

router.post(
    '/new', 
    //middlewares
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La clave es obligatoria. De 6 caracteres').isLength({min:6})
    ],
    crearUsuario
);

router.get('/renew', revalidarToken);

module.exports= router;