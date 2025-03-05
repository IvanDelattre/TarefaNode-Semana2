
import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { GetUserUseCase } from "src/use-cases/users/get-user-use-case";
import { z } from "zod"

export async function profile(request: FastifyRequest, reply: FastifyReply) {
    const prismaUsersRepository = new PrismaUserRepository()
    const getUserUseCase = new GetUserUseCase(prismaUsersRepository)

    const { user } = await getUserUseCase.execute({
        id : request.user.sub
    })
    
    return reply.status(200).send({
         user: {
              ...user,
              password: undefined
         }
    })    
}