import { Posts, Prisma, User } from "@prisma/client";
import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { UsersRepository } from "src/repositories/users-repository";
import { PostsRepository } from "src/repositories/posts-repository";


interface DeletePostUseCaseRequest{
    id : string
}


interface DeletePostUseCaseResponse {
    user: Posts
}


export class DeletePostUseCse{

    constructor( private  prismaPostRepository : PostsRepository ) {}

        async execute( {id } : DeletePostUseCaseRequest  ) : Promise<DeletePostUseCaseResponse>  {
            
            const user = await this.prismaPostRepository.delete( id ) 
            
            if( !user  ){
                throw new ResourceNotFoundError()
            }

            return { user }
        }



    
}