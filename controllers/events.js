const { request, response}= require('express');
const Evento= require('../models/Evento');

const  getEventos=async(req, res= response)=>{

    const eventos= await Evento.find().populate('user','name');

    return res.json(
    {
        ok:true,
        eventos
    });
};

//crear nuevo evento
const crearEvento=async(req, res= response)=>{

    const evento= new Evento(req.body);

    try {
        
        evento.user= req.uid;
        const objDB =  await evento.save();

       return res.json(
        {
            ok:true,
            msg:'crear evento',
            objDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador.'
        });
    }    
};
//actualizar evento
const actualizarEvento= async(req= request, res= response)=>{
    const eventoId= req.params.id;
    const uid= req.uid;

    try {

        const objDB= await Evento.findById(eventoId);
        if (!objDB){
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe.'
            });
        }

        if (objDB.user.toString()!=uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de editar este evento.'
            });
        }

        const nuevoEvento= {
            ...req.body,
            user: uid
        };

        const eventoActualizado= await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true});

        return res.json(
        {
            ok:true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador.'
        });
    }   
};

//borrar evento
const eliminarEvento=async(req= request, res= response)=>{
    const eventoId= req.params.id;
    const uid= req.uid;

    try {
        const objDB= await Evento.findById(eventoId);
        if (!objDB){
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe.'
            });
        }

        if (objDB.user.toString()!=uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de eliminar este evento.'
            });
        }

        await Evento.findByIdAndDelete(eventoId);
        return res.json(
        {
            ok:true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador.'
        });
    }

    return res.json(
    {
        ok:true,
        msg:`eliminar evento ${id}`
    });
};

module.exports= {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}