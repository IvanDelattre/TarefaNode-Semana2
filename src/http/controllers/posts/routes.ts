import { FastifyInstance } from "fastify";
import { register } from "./register";
import { deletePost } from "./delete";
import { getPost } from "./get";
import { update } from "./update";
import { getPostByUser } from "./getByUser";
import { getAllPosts } from "./getAll";
import { verifyJWT } from "src/http/middlewares/verify-jwt";


export function postsRoutes( app : FastifyInstance ){
    app.post('/posts' , {onRequest : [verifyJWT]} , register ) ; 

    app.get('/posts' , getAllPosts)

    app.get('/postsByUser/:userId' , getPostByUser )

    app.delete('/posts/:id' ,  {onRequest : [verifyJWT]}  , deletePost) ;

    app.get('/posts/:id' , getPost) ;

    app.patch('/posts/:id' , {onRequest : [verifyJWT]} , update ) ; 
    
}