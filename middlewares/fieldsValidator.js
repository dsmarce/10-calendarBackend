const { response }=require('express');
const {validationResult}= require('express-validator');

const fieldsValidator=(req,res= response, next)=>{
    
    //manejo de errores con el middleware
    //las validaciones esta declaradas en la ruta
    const errors= validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errors.mapped()
        });
    }

    next();
}

module.exports={
     fieldsValidator
};