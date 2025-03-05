import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-post-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { GetPostsUseCase } from "src/use-cases/posstes/get-post-use-case";

import { z } from "zod"


export async function getPost(request: FastifyRequest , reply: FastifyReply  ) {
    const getParamsSchema = z.object({
      id: z.string().uuid()
    })
  
    const { id } = getParamsSchema.parse(request.params)
  
    try {
      const prismaPostsRepository = new PrismaPostsRepository ()
      const getUserUseCase = new GetPostsUseCase ( prismaPostsRepository )
      const user = await getUserUseCase.execute({
        id
      })

      return reply.status(200).send({user}) ; 
      
    } catch (err) {
      if (err instanceof ResourceNotFoundError  ) {
        return reply.status(404).send({ message: err.message })
      }
      throw err
    }
  }
  