//codigo de post

import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { Posts, User } from "@prisma/client"
import { UserUpdateInput } from "src/repositories/users-repository"
import { compare, hash } from "bcryptjs"
import { PrismaPostsRepository } from "src/repositories/prisma/prisma-post-repository"
import { PostUpdateInput } from "src/repositories/posts-repository"



interface UpdatePostUseCaseRequest{
    id : string 
    data : PostUpdateInput
}

interface GetPostUseCaseResponse{
    post : Posts 
}

export class UpdatePostUseCase{
    constructor( private postRepository : PrismaPostsRepository ) {}


    async execute({id , data} : UpdatePostUseCaseRequest ): Promise<GetPostUseCaseResponse> {
         
        const post = await this.postRepository.findById(id) 
        if(!post ) throw new ResourceNotFoundError()
        
        
        const postUpdated = await this.postRepository.update(id , data )
        
        if(!postUpdated) throw new ResourceNotFoundError()
        
        return { post :  postUpdated }
    }

}