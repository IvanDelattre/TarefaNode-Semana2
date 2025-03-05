import { Comentario } from "@prisma/client"
import { ComentarioUpdateInput } from "src/repositories/comentarios-repository"
import { PrismaComentarioRepository } from "src/repositories/prisma/prisma-comentario-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"



interface UpdatePostUseCaseRequest{
    id : string 
    data : ComentarioUpdateInput
}

interface GetPostUseCaseResponse{
    comentario : Comentario
}

export class UpdateComentarioUseCase{
    constructor( private comentarioRepository : PrismaComentarioRepository ) {}


    async execute({id , data} : UpdatePostUseCaseRequest ): Promise<GetPostUseCaseResponse> {
         
        const comentario = await this.comentarioRepository.findById(id) 
        if(!comentario ) throw new ResourceNotFoundError()
        
        
        const comentarioUpdated = await this.comentarioRepository.update(id , data )
        
        if(!comentarioUpdated) throw new ResourceNotFoundError()
        
        return { comentario :  comentarioUpdated }
    }

}