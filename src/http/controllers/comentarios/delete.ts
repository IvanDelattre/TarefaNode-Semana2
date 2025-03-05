import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaComentarioRepository } from "src/repositories/prisma/prisma-comentario-repository";
import { DeleteComentarioUseCse } from "src/use-cases/comentarios/delete-comentario-use-case";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { z } from "zod";



export async function deleteComentario(request : FastifyRequest  , reply : FastifyReply) {
   
  const getParamsSchema = z.object({
  id: z.string().uuid()
  })

  const { id } = getParamsSchema.parse(request.params)
  

  try{
    const prismaRepository = new PrismaComentarioRepository() ; 
    const deleteComentarioUseCase = new DeleteComentarioUseCse(prismaRepository)
    const post =  await deleteComentarioUseCase.execute({
        id  
    })
    return reply.status(204).send({ post })

    }catch(err) {
      if (err instanceof ResourceNotFoundError  ) {
        return reply.status(404).send({ message: err.message })
      }
      throw err

    }

    
}