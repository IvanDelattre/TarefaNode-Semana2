import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { GetUserUseCase } from "src/use-cases/users/get-user-use-case";
import { GetAllUserUseCase } from "src/use-cases/users/getall-user-use-case";
import { z } from "zod"


export async function getAllUsers(request: FastifyRequest , reply: FastifyReply  ) {
    
    try {
      const prismaUsersRepository = new PrismaUserRepository ()
      const getAllUserUseCase = new GetAllUserUseCase (prismaUsersRepository)
      const users = await getAllUserUseCase.execute()

      return reply.status(200).send(users) ; 
      
    } catch (err) {
      if (err instanceof ResourceNotFoundError  ) {
        return reply.status(404).send({ message: err.message })
      }
      throw err
    }
  }
  