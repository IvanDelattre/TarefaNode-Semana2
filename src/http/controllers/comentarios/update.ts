import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaComentarioRepository } from "src/repositories/prisma/prisma-comentario-repository";
import { UpdateComentarioUseCase } from "src/use-cases/comentarios/update-comentario-use-case";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { z } from "zod"


export async function update(request: FastifyRequest , reply: FastifyReply  ) {
    const updateParamsSchema = z.object({
        id: z.string().uuid()
      })
  

    const updateBodySchema = z.object({
        content : z.string().optional() , 
        created_at : z.string().transform((str) =>  new Date(str) ).optional() ,
        userId : z.string().optional(),
        postId : z.string().optional()
    })

    const {id} = updateParamsSchema.parse(request.params)
    const { content , created_at , postId } = updateBodySchema.parse(request.body)
    
  
    try {
      const prismaComentarioRepository = new PrismaComentarioRepository()
      const updateComentarioUseCase = new UpdateComentarioUseCase (prismaComentarioRepository)
      const user = await updateComentarioUseCase.execute({
        id ,
        data :{
            content,
            created_at ,
            userId : request.user.sub,
            postId
        }
    })
    
    return reply.status(200).send({user}) ; 
      
    } catch (err) {
      if (err instanceof ResourceNotFoundError  ) {
        return reply.status(404).send({ message: err.message })
      }
      throw err
    }
  }
  