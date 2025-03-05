import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-post-repository";
import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { GetAllPostsUseCase } from "src/use-cases/posstes/getAll-post-use-case";
import { GetUserUseCase } from "src/use-cases/users/get-user-use-case";
import { GetAllUserUseCase } from "src/use-cases/users/getall-user-use-case";
import { z } from "zod"


export async function getAllPosts( request: FastifyRequest , reply: FastifyReply  ) {
    
    try {
      const prismaPostsRepository = new PrismaPostsRepository()
      const getAllUserUseCase = new GetAllPostsUseCase (prismaPostsRepository)
      const posts = await getAllUserUseCase.execute()

      return reply.status(200).send(posts) ; 
      
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: err.message })
      }
      throw err
    }
  }
  