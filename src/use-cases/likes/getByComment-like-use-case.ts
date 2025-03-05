
import { Like } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { PrismaLikesRepository } from "src/repositories/prisma/prisma-like-repository"


interface GetLikeByCommentUseCaseRequest {
    commentId : string 
}

interface GetLikeByCommentUseCaseResponse {
    likes : Like[]
}

export class GetLikesByCommentUseCase{
    constructor( private likeRepository : PrismaLikesRepository ) {}


    async execute({ commentId } :  GetLikeByCommentUseCaseRequest  ) : Promise< GetLikeByCommentUseCaseResponse >  {
        
        const likes = await this.likeRepository.findLikeByComentario( commentId )

        if( !likes ){
            throw new ResourceNotFoundError()
        }

        return { likes }
    }

}