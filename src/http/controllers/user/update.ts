import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository"
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { GetUserUseCase } from "src/use-cases/users/get-user-use-case";

import { UpdateUserUseCase } from "src/use-cases/users/update-user-use-case";
import { z } from "zod"


export async function update(request: FastifyRequest , reply: FastifyReply  ) {
    
    const updateBodySchema = z.object({
        name : z.string().optional() ,
        email : z.string().email().optional() ,
        senha : z.string().optional() ,
        foto : z.string().optional()
    })

    //const {id} = updateParamsSchema.parse(request.params)
    const { name , email , senha , foto } = updateBodySchema.parse(request.body)
    
  
    try {
      const prismaUsersRepository = new PrismaUserRepository ()
      const updateUserUseCase = new UpdateUserUseCase (prismaUsersRepository)
      const user = await updateUserUseCase.execute({
        id : request.user.sub ,
        data :{
            name,
            email, 
            senha,
            foto 
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
  