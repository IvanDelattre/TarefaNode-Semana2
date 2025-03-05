import { Comentario } from "@prisma/client"
import { PrismaComentarioRepository } from "src/repositories/prisma/prisma-comentario-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"



interface GetAllComentarioUseCaseResponse{
    comentarios : Comentario[]
}

export class GetAllComentariosUseCase{
    constructor( private comentarioRepository : PrismaComentarioRepository ) {}

    async execute( ) : Promise<GetAllComentarioUseCaseResponse>  {
        
        const comentarios = await this.comentarioRepository.findMany()

        if( !comentarios ){
            throw new ResourceNotFoundError()
        }

        return { comentarios }
    }

}