
const {response}= require('express');
const {validationResult}= require('express-validator');


const crearUsuario= (req, res= response)=>{
    const {email, name, password} = req.body;

    // TODO: esto se va a hacer con express-validator
    // if (name.length<5){
    //     return res.status(400).json({
    //         ok:false,
    //         msg:'El nombre debe ser de 5 letras'
    //     });
    // }

    //manejo de errores con el middleware
    //las validaciones esta declaradas en la ruta
    const errors= validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errors.mapped()
        });
    }

    //201 creacion del usuario
    res.status(201).json({
        ok:true,
        msg:'crearUsuario',
        name,
        email, 
        password
    });
};

const loginUsuario= (req, res= response)=>{
    const {email, password} = req.body;

    //las validaciones esta declaradas en la ruta
    const errors= validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errors.mapped()
        });
    }

    res.json({
        ok:true,
        msg:'loginUsuario',
        email, 
        password
    });
};

const revalidarToken= (req, res= response)=>{
    res.json({
        ok:true,
        msg:'revalidarToken'
    });
};

module.exports={
    crearUsuario,
    loginUsuario,
    revalidarToken
}