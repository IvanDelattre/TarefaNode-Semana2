import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJWT } from "src/http/middlewares/verify-jwt";
import { getlike } from "./getById";
import { getLikeByPost } from "./getByPost";
import { getLikesByUser } from "./getByUser";
import { getLikesByComment } from "./getByComment";
import { deleteLike } from "./delete";


export function LikeRoutes(app : FastifyInstance){
    
    app.post('/like' , {onRequest : [verifyJWT]}   , create  ) ; 
    app.get('/like/:id' , getlike ) ; 
    app.get('/like/getById/:postId' , getLikeByPost) ; 
    app.get('/like/getByUser/:userId', getLikesByUser) ; 

    app.get('/like/getByComment/:commentId' , getLikesByComment) ; 

    app.delete('/like/:id' , {onRequest : [verifyJWT]} ,deleteLike) ; 
    
}