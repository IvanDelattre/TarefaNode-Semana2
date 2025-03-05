import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-post-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { UpdatePostUseCase } from "src/use-cases/posstes/update-post-use-case";

import { z } from "zod"


export async function update(request: FastifyRequest , reply: FastifyReply  ) {
    const updateParamsSchema = z.object({
      id: z.string().uuid()
    })

    const updateBodySchema = z.object({
        content : z.string().optional() , 
        created_at : z.string().transform((str) =>  new Date(str) ).optional() ,
        userId : z.string().optional()
    })

    const {id} = updateParamsSchema.parse(request.params)
    const { content , created_at , userId } = updateBodySchema.parse(request.body)
    
  
    try {
      const prismaPostsRepository = new PrismaPostsRepository()
      const updatePostsUseCase = new UpdatePostUseCase (prismaPostsRepository)
      const user = await updatePostsUseCase.execute({
        id,
        data :{
            content,
            created_at ,
            userId : request.user.sub
        }
    })
    
    return reply.status(200).send({user}) ; 
      
    } catch (err) {
      if (err instanceof ResourceNotFoundError  ) {
        return reply.status(404).send({ message: err.message })
      }
      throw err
    }
  }
  