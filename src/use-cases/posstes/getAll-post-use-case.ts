import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { Posts, User } from "@prisma/client"
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-post-repository"


interface GetAllPostUseCaseResponse{
    posts : Posts[]
}

export class GetAllPostsUseCase{
    constructor( private postsRepository : PrismaPostsRepository ) {}

    async execute( ) : Promise<GetAllPostUseCaseResponse>  {
        
        const posts = await this.postsRepository.findMany()

        if( !posts ){
            throw new ResourceNotFoundError()
        }

        return { posts }
    }

}