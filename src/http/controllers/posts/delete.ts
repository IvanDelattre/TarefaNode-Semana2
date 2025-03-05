import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-post-repository";
import { DeletePostUseCse } from "src/use-cases/posstes/delete-post-use-case";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { z } from "zod";



export async function deletePost(request : FastifyRequest  , reply : FastifyReply) {
    
  const getParamsSchema = z.object({
  id: z.string().uuid()
  })

  const { id } = getParamsSchema.parse(request.params)


  try{
    const prismaRepository = new PrismaPostsRepository() ; 
    const deletePostUseCase = new DeletePostUseCse(prismaRepository)
    const post =  await deletePostUseCase.execute({
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