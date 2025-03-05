import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { GetUserUseCase } from "src/use-cases/users/get-user-use-case";
import { z } from "zod"


export async function getUser(request: FastifyRequest , reply: FastifyReply  ) {
    const getParamsSchema = z.object({
      id: z.string().uuid()
    })
  
    const { id } = getParamsSchema.parse(request.params)
  
    try {
      const prismaUsersRepository = new PrismaUserRepository ()
      const getUserUseCase = new GetUserUseCase (prismaUsersRepository)
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
  