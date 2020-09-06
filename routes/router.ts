import { Router, Request, Response } from 'express';

//export const router = Router(); //Otra forma
const router = Router(); 

router.get('/mensajes', ( req:Request, res:Response ) => {
    res.json({
        ok: true,
        mensaje: 'Todo está bien'
    });
});

router.post('/mensajes', ( req:Request, res:Response ) => {

    //La configuración del bodyParse lo coloca aquí en req.body
    //Si alguno de estos valores no se envia es undefined
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    
    //Se puede poner cuerpo: cuerpo, pero es redundante
    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', ( req:Request, res:Response ) => {

    //La configuración del bodyParse lo coloca aquí en req.body
    //Si alguno de estos valores no se envia es undefined
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    //Se puede poner cuerpo: cuerpo, pero es redundante
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});


export default router;
