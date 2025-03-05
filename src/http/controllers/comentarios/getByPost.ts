import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaComentarioRepository } from "src/repositories/prisma/prisma-comentario-repository"
import { GetComentariosByPostUseCase } from "src/use-cases/comentarios/getByPost-comentario-user-use-case"
import { GetComentariosByUserUseCase } from "src/use-cases/comentarios/getByUser-comentario-use-case"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error"
import { z } from "zod"


export async function getComentariosByPost(request: FastifyRequest , reply: FastifyReply  ) {
    const getParamsSchema = z.object({
      postId: z.string()
    })
  
    const { postId } = getParamsSchema.parse(request.params )
  
    try {
      const prismaComentarioRepository = new PrismaComentarioRepository ()
      const getComentarioByUserUseCase = new GetComentariosByPostUseCase ( prismaComentarioRepository )
      const comentarios = await getComentarioByUserUseCase.execute({
        postId
      })

      return reply.status(200).send( comentarios ) ; 
      
    } catch (err) {
      if (err instanceof ResourceNotFoundError  ) {
        return reply.status(404).send({ message: err.message })
      }
      throw err
    }


}
  