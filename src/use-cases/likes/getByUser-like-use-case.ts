
import { Like } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { PrismaLikesRepository } from "src/repositories/prisma/prisma-like-repository"


interface GetLikeByUserUseCaseRequest {
    userId : string 
}

interface GetLikeByUserUseCaseResponse {
    likes : Like[]
}

export class GetLikesByUserUseCase{
    constructor( private comentarioRepository : PrismaLikesRepository ) {}


    async execute({ userId } :  GetLikeByUserUseCaseRequest  ) : Promise< GetLikeByUserUseCaseResponse >  {
        
        const likes = await this.comentarioRepository.findLikeByUser(userId)

        if( !likes ){
            throw new ResourceNotFoundError()
        }

        return { likes }
    }

}