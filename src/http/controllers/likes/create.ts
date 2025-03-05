import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaLikesRepository } from "src/repositories/prisma/prisma-like-repository";
import { InvalidCredentialsError } from "src/use-cases/errors/invalid-credentials-error";
import { RegisterLikeUseCase } from "src/use-cases/likes/create-like-use-case";
import { z} from 'zod'


export async function create( request : FastifyRequest , reply : FastifyReply ) {
    const registerBodySchema = z.object({
        
        created_at : z.string().transform((str) => new Date(str ) ),
        
        postId : z.string().optional(),
        commentId : z.string().optional()
    })
    
    const { created_at   , postId , commentId  } = registerBodySchema.parse(request.body)
    
    try{
        const likeRepository = new PrismaLikesRepository()
        const registerUseCase = new  RegisterLikeUseCase(likeRepository) 

        await registerUseCase.execute({
            created_at,
            userId : request.user.sub,
            postId,
            commentId
        })


    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(404).send({ message: error.message })
        
      }
      throw error
    }
    
    return reply.status(201).send('like criado com  sucesso ') ;


}
