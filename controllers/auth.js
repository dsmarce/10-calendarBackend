
const {response}= require('express');

const crearUsuario= (req, res= response)=>{
    const {email, name, password} = req.body;

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