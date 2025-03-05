import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { Posts, User } from "@prisma/client"
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-post-repository"



interface GetPostUseCaseRequest{
    id : string 
}

interface GetPostUseCaseResponse{
    post : Posts
}

export class GetPostsUseCase{
    constructor( private postsRepository : PrismaPostsRepository ) {}


    async execute({ id } : GetPostUseCaseRequest  ) : Promise<GetPostUseCaseResponse>  {
        
        const post = await this.postsRepository.findById(id)

        if( !post ){
            throw new ResourceNotFoundError()
        }

        return { post }
    }

}