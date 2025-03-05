import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaComentarioRepository } from "src/repositories/prisma/prisma-comentario-repository"
import { GetAllComentariosUseCase } from "src/use-cases/comentarios/getAll-comentario-use-case"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error"
import { z } from "zod"


export async function getAllComentarios( request: FastifyRequest , reply: FastifyReply  ) {
    
    try {
      const prismaComentariosRepository = new PrismaComentarioRepository()
      const getAllComentariosUseCase = new GetAllComentariosUseCase (prismaComentariosRepository)
      const comentarios = await getAllComentariosUseCase.execute()

      return reply.status(200).send( comentarios ) ; 
      
    } catch (err) {
      if (err instanceof ResourceNotFoundError ) {
        return reply.status(404).send({ message: err.message })
      }
      throw err
    }
  }
  