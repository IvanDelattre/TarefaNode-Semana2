import { Comentario, Like } from "@prisma/client"

import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { LikesRepository } from "src/repositories/like-repository"


interface GetLikeByPostUseCaseRequest {
    postId : string 
}

interface GetLikeByPostUseCaseResponse {
    likes : Like[]
}

export class GetLikeByPostUseCase{
    constructor( private likeRepository : LikesRepository ) {}


    async execute({ postId } :  GetLikeByPostUseCaseRequest  ) : Promise< GetLikeByPostUseCaseResponse >  {
        
        const likes = await this.likeRepository.findLikeByPost(postId)

        if( !likes ){
            throw new ResourceNotFoundError()
        }

        return { likes }
    }

}