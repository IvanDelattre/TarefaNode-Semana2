import { LikesRepository } from "src/repositories/like-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error"


interface RegisterLikeUseCaseRequest{
    created_at : Date
    userId : string
    postId ?: string | undefined
    commentId ?: string | undefined
}


export class RegisterLikeUseCase{
    constructor( private likeRepository : LikesRepository ) {}

    async execute({ created_at , userId , postId , commentId  } : RegisterLikeUseCaseRequest   ){
        
        if( commentId && postId  ) throw new InvalidCredentialsError()
        if(  !commentId  && !postId ) throw new InvalidCredentialsError()
        
        await this.likeRepository.create({
            created_at,
            userId,
            postId,
            commentId
        })  
    }



}