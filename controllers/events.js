const { request, response}= require('express');
const  getEventos=(req, res= response)=>{
    return res.json(
    {
        ok:true,
        msg:'Obtener eventos'
    });
};

//crear nuevo evento
const crearEvento=(req, res= response)=>{

    console.log(req.body);
    console.log(req.uid);


    return res.json(
    {
        ok:true,
        msg:'crear evento'
    });
};
//actualizar evento
const actualizarEvento=(req= request, res= response)=>{
    const id= req.params.id;

    return res.json(
    {
        ok:true,
        msg:`actualizar evento ${id}`
    });
};

//borrar evento
const eliminarEvento=(req= request, res= response)=>{
    const id= req.params.id;

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