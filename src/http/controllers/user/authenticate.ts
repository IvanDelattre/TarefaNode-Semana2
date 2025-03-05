import { hashSync } from "bcryptjs"
import { Hash, hash } from "crypto"
import { FastifyReply, FastifyRequest } from "fastify"
import { prisma } from "src/lib/prisma"
import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository"
import { InvalidCredentialsError } from "src/use-cases/errors/invalid-credentials-error"
import { AuthenticateUseCase } from "src/use-cases/users/authenticate-user-use-case"


import { z } from "zod"


export async function authenticate(request: FastifyRequest, reply: FastifyReply ) {
    const  authenticateBodySchema = z.object({
        
        email : z.string().email() , 
        senha : z.string().min(6)

        
    })
    const {  email , senha} = authenticateBodySchema.parse(request.body)
    
    try{

        const prismaUsersRepository =  new PrismaUserRepository()
        const authenticateUseCase = new  AuthenticateUseCase(   prismaUsersRepository   )

        const {user} =  await authenticateUseCase.execute({
            email,
            senha
        })
            
        const token = await reply.jwtSign({} , {
            sign :{
                sub : user.id
            }
        })

        return reply.status(201).send({token}) ; 

    }catch(err){
        throw err
    }
    
    
}

