
const {response}= require('express');
const bcrypt= require('bcryptjs');
const Usuario= require('../models/Usuario');
const {generateJWT}= require('../helpers/jwt')

const crearUsuario= async (req, res= response)=>{
    const {email, password} = req.body;
    try {
        let usuario= await Usuario.findOne({ email});
        if (usuario){
            return res.status(400).json({
                ok:false,
                msg:'Un usuario ya existe con ese email.',
            });
        }

        usuario= new Usuario(req.body);
        //encriptar password
        const salt=bcrypt.genSaltSync();
        usuario.password= bcrypt.hashSync(password, salt);

        await usuario.save();

         //generar JWT
         const token= await generateJWT(usuario.id, usuario.name);

        //201 creacion del usuario
        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name:usuario.name,
            token
        });
    } catch (error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador.'
        });
    }
};

const loginUsuario= async(req, res= response)=>{
    const {email, password} = req.body;

    try{

        const usuario= await Usuario.findOne({ email});
        if (!usuario){
            return res.status(400).json({
                ok:false,
                msg:'Usuario y clave erroneos.',
            });
        }

        //confirmar la clave
        const validPassword= bcrypt.compareSync(password, usuario.password);
        if (!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Password incorrecto'
            })
        }

        //generar JWT
        const token= await generateJWT(usuario.id, usuario.name);

        res.json({
            ok:true,
            uid: usuario.id,
            name:usuario.name,
            token
        });

    } catch (error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador.'
        });
    }   
};

const revalidarToken= async(req, res= response)=>{

    const {uid, name} = req;

    //generar un nuevo JWT y retornarlo en este peticion
    const token= await generateJWT(uid, name);

    res.json({
        ok:true,
        token
    });
};

module.exports={
    crearUsuario,
    loginUsuario,
    revalidarToken
}