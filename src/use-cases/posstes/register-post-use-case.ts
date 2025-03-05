import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository";
import { UserAlreadyExists } from "../errors/usuer-already-exist";
import { hash } from "bcryptjs";
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-post-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";


interface RegisterPostUseCaseRequest{
    content : string
    created_at : Date
    userId : string 
}



export class RegisterPostUseCase{
    constructor( private postRepository : PrismaPostsRepository ) {}

    async execute({ content , created_at , userId } : RegisterPostUseCaseRequest   ){
        
        const prismaUsersRepository = new PrismaUserRepository()

        const user = await prismaUsersRepository.findById(userId) 

        if(!user) throw new ResourceNotFoundError()


        await this.postRepository.create({
            content,
            created_at,
            userId
        })
    }


}