import { PrismaComentarioRepository } from "src/repositories/prisma/prisma-comentario-repository"
import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"


interface RegisterComentarioUseCaseRequest{
    content : string
    created_at : Date
    userId : string 
    postId : string
}



export class RegisterComentarioUseCase{
    constructor( private ComentarioRepository : PrismaComentarioRepository ) {}

    async execute({ content , created_at , userId  , postId } : RegisterComentarioUseCaseRequest   ){
        
        const prismaUsersRepository = new PrismaUserRepository()
        const user = await prismaUsersRepository.findById(userId) 
        if(!user) throw new ResourceNotFoundError()


        await this.ComentarioRepository.create({
            content,
            created_at,
            userId,
            postId 
        })
    }


}