import { Comentario } from "@prisma/client"
import { PrismaComentarioRepository } from "src/repositories/prisma/prisma-comentario-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"


interface GetComentarioUseCaseRequest{
    id : string 
}

interface GetComentarioUseCaseResponse{
    comentario : Comentario
}

export class GetComentarioUseCase{
    constructor( private comentarioRepository : PrismaComentarioRepository  ) {}


    async execute({ id } : GetComentarioUseCaseRequest  ) : Promise<GetComentarioUseCaseResponse>  {
        
        const comentario = await this.comentarioRepository.findById(id)

        if( !comentario ){
            throw new ResourceNotFoundError()
        }

        return { comentario }
    }

}