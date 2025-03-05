import { Comentario, Like } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { PrismaLikesRepository } from "src/repositories/prisma/prisma-like-repository"


interface GetLikeUseCaseRequest{
    postId : string 
}

interface GetLikeUseCaseResponse{
    likes : Like
}

export class GetLikeUseCase{
    constructor( private likeRepository : PrismaLikesRepository  ) {}


    async execute({ postId } : GetLikeUseCaseRequest  ) : Promise<GetLikeUseCaseResponse>  {
        

        const likes = await this.likeRepository.findById(postId )

        if( !likes ){
            throw new ResourceNotFoundError()
        }

        

        return { likes }
    }

}