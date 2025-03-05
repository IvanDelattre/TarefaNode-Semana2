import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaComentarioRepository } from "src/repositories/prisma/prisma-comentario-repository";
import { RegisterComentarioUseCase } from "src/use-cases/comentarios/create-comentario-use-case";
import { z} from 'zod'


export async function create( request : FastifyRequest , reply : FastifyReply ) {
    const registerBodySchema = z.object({
        content : z.string(),
        created_at : z.string().transform((str) => new Date(str ) ),
        
        postId : z.string()

    })
    
    const { content , created_at  , postId } = registerBodySchema.parse(request.body)
    
    try{
        const ComentarioRepository = new PrismaComentarioRepository()
        const registerUseCase = new  RegisterComentarioUseCase(ComentarioRepository) 

        await registerUseCase.execute({
            content,
            created_at,
            userId : request.user.sub , 
            postId
        })


    }catch(err){
        
        throw err 
    }
    
    
    return reply.status(201).send('Comentario criado com  sucesso ') ;


}
