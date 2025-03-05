import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaLikesRepository } from "src/repositories/prisma/prisma-like-repository"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error"
import { GetLikeUseCase } from "src/use-cases/likes/getById-like-use-case"

import { z } from "zod"


export async function getlike(request: FastifyRequest , reply: FastifyReply  ) {
    const getParamsSchema = z.object({
      postId: z.string()
    })
  
    const { postId } = getParamsSchema.parse(request.params)
  
    try {
      const prismalikeRepository = new PrismaLikesRepository ()
      const getlikeUseCase = new GetLikeUseCase ( prismalikeRepository )
      const user = await getlikeUseCase.execute({
        postId
      })

      return reply.status(200).send({user}) ; 
      
    } catch (err) {
      if (err instanceof ResourceNotFoundError  ) {
        return reply.status(404).send({ message: err.message })
      }
      throw err
    }
  }
  