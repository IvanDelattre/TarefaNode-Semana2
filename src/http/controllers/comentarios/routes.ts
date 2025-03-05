
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJWT } from "src/http/middlewares/verify-jwt";
import { getAllComentarios } from "./getAll";
import { getComentariosByUser } from "./getByUser";
import { getComentariosByPost } from "./getByPost";
import { getComentario } from "./getById";
import { deleteComentario } from "./delete";
import { update } from "./update";

export function ComentarioRoutes( app : FastifyInstance){
    
    app.post('/comentario' , {onRequest : [verifyJWT]}  ,create  ) ;
    app.get('/comentario' , getAllComentarios) ; 
    app.get('/comentario/getByUser/:userId' , getComentariosByUser )
    app.get('/comentario/getBypost/:postId'  , getComentariosByPost  )
    app.get('/comentario/:id' ,getComentario  )

    app.delete('/comentario/:id' ,  {onRequest : [verifyJWT]}  , deleteComentario) 

    app.patch('/comentario/:id' , {onRequest : [verifyJWT]} ,  update)

}
