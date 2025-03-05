import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository";
import { UserAlreadyExists } from "src/use-cases/errors/usuer-already-exist";
import { RegisterUseCase } from "src/use-cases/users/register-user-use-case";
import { z} from 'zod'


export async function register( request : FastifyRequest , reply : FastifyReply ) {
    const registerBodySchema = z.object({
        name : z.string(),
        email : z.string().email(),
        senha : z.string(),
        foto : z.string() 
    })
    
    const { name , email , senha , foto } = registerBodySchema.parse(request.body)
    
    try{
        const userRepository = new PrismaUserRepository
        const registerUseCase = new  RegisterUseCase(userRepository) 

        await registerUseCase.execute({
            name,
            email,
            senha,
            foto
        })


    }catch(err){
        if( err instanceof UserAlreadyExists ){
            return reply.status(409).send('Email já existente')
        }
        throw err 

    }
    
    
    return reply.status(201).send('Usuário criado com  sucesso ') ;


}
