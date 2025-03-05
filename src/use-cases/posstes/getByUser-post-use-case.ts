import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { Posts, User } from "@prisma/client"
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-post-repository"



interface GetPostByUserUseCaseRequest {
    userId : string 
}

interface GetPostByUserUseCaseResponse {
    posts : Posts[]
}

export class GetPostsByUserUseCase{
    constructor( private postsRepository : PrismaPostsRepository ) {}


    async execute({ userId } :  GetPostByUserUseCaseRequest  ) : Promise< GetPostByUserUseCaseResponse >  {
        
        const posts = await this.postsRepository.findPostsByUser(userId)

        if( !posts ){
            throw new ResourceNotFoundError()
        }

        return {posts }
    }

}