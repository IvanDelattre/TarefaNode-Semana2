import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaLikesRepository } from "src/repositories/prisma/prisma-like-repository"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error"
import { GetLikesByCommentUseCase } from "src/use-cases/likes/getByComment-like-use-case"
import { GetLikesByUserUseCase } from "src/use-cases/likes/getByUser-like-use-case"
import { z } from "zod"


export async function getLikesByComment(request: FastifyRequest , reply: FastifyReply  ) {
    const getParamsSchema = z.object({
      commentId: z.string()
    })
  
    const { commentId } = getParamsSchema.parse(request.params )
  
    try {
      const prismalikeRepository = new PrismaLikesRepository ()
      const getlikeByCommentUseCase = new GetLikesByCommentUseCase ( prismalikeRepository )
      const comentarios = await  getlikeByCommentUseCase.execute({
        commentId
      })

      return reply.status(200).send( comentarios ) ; 
      
    } catch (err) {
      if (err instanceof ResourceNotFoundError  ) {
        return reply.status(404).send({ message: err.message })
      }
      throw err
    }


}
  