import { Comentario, Like } from "@prisma/client"

import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { PrismaLikesRepository } from "src/repositories/prisma/prisma-like-repository"


interface DeleteLikeUseCaseRequest{
    id : string
}


interface DeleteLikeUseCaseResponse {
    like : Like
}


export class DeleteLikeUseCse{

    constructor( private  prismaLikeRepository : PrismaLikesRepository ) {}

        async execute( {id } : DeleteLikeUseCaseRequest  ) : Promise<DeleteLikeUseCaseResponse>  {
            
            const like = await this.prismaLikeRepository.delete( id ) 
            
            if( !like  ){
                throw new ResourceNotFoundError()
            }

            return { like }
        }



    
}