import { Comentario } from "@prisma/client"
import { PrismaComentarioRepository } from "src/repositories/prisma/prisma-comentario-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"


interface GetComentarioByPostUseCaseRequest {
    postId : string 
}

interface GetComentarioByPostUseCaseResponse {
    comentarios : Comentario[]
}

export class GetComentariosByPostUseCase{
    constructor( private comentarioRepository : PrismaComentarioRepository ) {}


    async execute({ postId } :  GetComentarioByPostUseCaseRequest  ) : Promise< GetComentarioByPostUseCaseResponse >  {
        
        const comentarios = await this.comentarioRepository.findComentariosByPost(postId)

        if( !comentarios ){
            throw new ResourceNotFoundError()
        }

        return { comentarios }
    }

}