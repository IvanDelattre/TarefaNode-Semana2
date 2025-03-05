import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaLikesRepository } from "src/repositories/prisma/prisma-like-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { DeleteLikeUseCse } from "src/use-cases/likes/delete-like-use-case";
import { z } from "zod";



export async function deleteLike(request : FastifyRequest  , reply : FastifyReply) {
   
  const getParamsSchema = z.object({
  id: z.string().uuid()
  })

  const { id } = getParamsSchema.parse(request.params)
  

  try{
    const prismaRepository = new PrismaLikesRepository() ; 
    const deletelikeUseCase = new DeleteLikeUseCse(prismaRepository)
    const post =  await deletelikeUseCase.execute({
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