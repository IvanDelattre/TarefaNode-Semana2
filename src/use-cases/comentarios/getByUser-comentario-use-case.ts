import { Comentario } from "@prisma/client"
import { PrismaComentarioRepository } from "src/repositories/prisma/prisma-comentario-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"


interface GetComentarioByUserUseCaseRequest {
    userId : string 
}

interface GetComentarioByUserUseCaseResponse {
    comentarios : Comentario[]
}

export class GetComentariosByUserUseCase{
    constructor( private comentarioRepository : PrismaComentarioRepository ) {}


    async execute({ userId } :  GetComentarioByUserUseCaseRequest  ) : Promise< GetComentarioByUserUseCaseResponse >  {
        
        const comentarios = await this.comentarioRepository.findComentariosByUser(userId)

        if( !comentarios ){
            throw new ResourceNotFoundError()
        }

        return { comentarios }
    }

}