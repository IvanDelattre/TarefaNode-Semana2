import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaComentarioRepository } from "src/repositories/prisma/prisma-comentario-repository"
import { GetComentarioUseCase } from "src/use-cases/comentarios/getById-comentario-use-case"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error"

import { z } from "zod"


export async function getComentario(request: FastifyRequest , reply: FastifyReply  ) {
    const getParamsSchema = z.object({
      id: z.string().uuid()
    })
  
    const { id } = getParamsSchema.parse(request.params)
  
    try {
      const prismaComentarioRepository = new PrismaComentarioRepository ()
      const getComentarioUseCase = new GetComentarioUseCase ( prismaComentarioRepository )
      const user = await getComentarioUseCase.execute({
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
  