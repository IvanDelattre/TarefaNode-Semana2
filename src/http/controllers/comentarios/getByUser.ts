import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaComentarioRepository } from "src/repositories/prisma/prisma-comentario-repository"
import { GetComentariosByUserUseCase } from "src/use-cases/comentarios/getByUser-comentario-use-case"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error"
import { z } from "zod"


export async function getComentariosByUser(request: FastifyRequest , reply: FastifyReply  ) {
    const getParamsSchema = z.object({
      userId: z.string()
    })
  
    const { userId } = getParamsSchema.parse(request.params )
  
    try {
      const prismaComentarioRepository = new PrismaComentarioRepository ()
      const getComentarioByUserUseCase = new GetComentariosByUserUseCase ( prismaComentarioRepository )
      const comentarios = await getComentarioByUserUseCase.execute({
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
  