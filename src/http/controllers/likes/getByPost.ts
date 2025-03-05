import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaLikesRepository } from "src/repositories/prisma/prisma-like-repository"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error"
import { GetLikeByPostUseCase } from "src/use-cases/likes/getByPost-like-use-case"
import { z } from "zod"


export async function getLikeByPost(request: FastifyRequest , reply: FastifyReply  ) {
    const getParamsSchema = z.object({
      postId: z.string()
    })
  
    const { postId } = getParamsSchema.parse(request.params )
  
    try {
      const prismalikeRepository = new PrismaLikesRepository ()
      const getlikeByUserUseCase = new GetLikeByPostUseCase ( prismalikeRepository )
      const likes = await getlikeByUserUseCase.execute({
        postId
      })

      return reply.status(200).send( likes ) ; 
      
    } catch (err) {
      if (err instanceof ResourceNotFoundError  ) {
        return reply.status(404).send({ message: err.message })
      }
      throw err
    }


}
  