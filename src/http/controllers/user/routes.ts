import { FastifyInstance } from "fastify";
import { register } from "./register";
import { deleteUser } from "./delete";
import { getUser } from "./get";
import { update } from "./update";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { Verify } from "crypto";
import { verifyJWT } from "src/http/middlewares/verify-jwt";
import { getAllUsers } from "./getAll";


export function userRoutes( app : FastifyInstance  ) {
    app.post('/users',  register  )

    app.get('/users/' , getAllUsers ) 

    app.delete('/users' , {onRequest : [verifyJWT]} ,deleteUser )

    app.get('/users/:id' , getUser ) 

    app.patch('/users' ,  {onRequest : [verifyJWT]}    , update )

    app.post('/authenticate' , authenticate) 
    
    //Authenticated
    app.get('/profile' ,{onRequest : [verifyJWT]}  ,profile )
}