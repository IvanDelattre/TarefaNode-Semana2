import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaLikesRepository } from "src/repositories/prisma/prisma-like-repository"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error"
import { GetLikesByUserUseCase } from "src/use-cases/likes/getByUser-like-use-case"
import { z } from "zod"


export async function getLikesByUser(request: FastifyRequest , reply: FastifyReply  ) {
    const getParamsSchema = z.object({
      userId: z.string()
    })
  
    const { userId } = getParamsSchema.parse(request.params )
  
    try {
      const prismalikeRepository = new PrismaLikesRepository ()
      const getlikeByUserUseCase = new GetLikesByUserUseCase ( prismalikeRepository )
      const comentarios = await getlikeByUserUseCase.execute({
        userId
      })

      return reply.status(200).send( comentarios ) ; 
      
    } catch (err) {
      if (err instanceof ResourceNotFoundError  ) {
        return reply.status(404).send({ message: err.message })
      }
      throw err
    }


}
  