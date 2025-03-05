import { Comentario } from "@prisma/client"
import { ComentariosRepository } from "src/repositories/comentarios-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"


interface DeletePostUseCaseRequest{
    id : string
}


interface DeletePostUseCaseResponse {
    comentario: Comentario
}


export class DeleteComentarioUseCse{

    constructor( private  prismaComentarioRepository : ComentariosRepository ) {}

        async execute( {id } : DeletePostUseCaseRequest  ) : Promise<DeletePostUseCaseResponse>  {
            
            const comentario = await this.prismaComentarioRepository.delete( id ) 
            
            if( !comentario  ){
                throw new ResourceNotFoundError()
            }

            return { comentario }
        }



    
}