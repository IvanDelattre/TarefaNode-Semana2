import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository"
import { DeleteUseCse } from "src/use-cases/users/delete-user-use-case";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { z } from "zod"


export async function deleteUser(request: FastifyRequest , reply: FastifyReply  ) {
    /*const getParamsSchema = z.object({
      id: z.string().uuid()
    })
  
    const { id } = getParamsSchema.parse(request.params)
    */
    try {
      const prismaUsersRepository = new PrismaUserRepository ()
      const deleteUserUseCase = new DeleteUseCse (prismaUsersRepository)
      const user = await deleteUserUseCase.execute({
        id : request.user.sub
      })
  
      return reply.status(204).send({ user })

      
    } catch (err) {
      if (err instanceof ResourceNotFoundError  ) {
        return reply.status(404).send({ message: err.message })
      }
      throw err
    }
  }
  