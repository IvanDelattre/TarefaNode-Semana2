import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-post-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { GetPostsUseCase } from "src/use-cases/posstes/get-post-use-case";
import { GetPostsByUserUseCase } from "src/use-cases/posstes/getByUser-post-use-case";

import { z } from "zod"


export async function getPostByUser(request: FastifyRequest , reply: FastifyReply  ) {
    const getParamsSchema = z.object({
      userId: z.string()
    })
  
    const { userId } = getParamsSchema.parse(request.params )
  
    try {
      const prismaPostsRepository = new PrismaPostsRepository ()
      const getPostByUserUseCase = new GetPostsByUserUseCase ( prismaPostsRepository )
      const posts = await getPostByUserUseCase.execute({
        userId
      })

      return reply.status(200).send( posts ) ; 
      
    } catch (err) {
      if (err instanceof ResourceNotFoundError  ) {
        return reply.status(404).send({ message: err.message })
      }
      throw err
    }


}
  