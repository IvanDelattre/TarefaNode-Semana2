import { Comentario,  Prisma } from "@prisma/client";


export interface ComentarioUpdateInput{
    content?: string
    created_at?: Date
    userId?: string
    postId?: string
}


export interface ComentariosRepository{
    
    findById(id : string) : Promise<  Comentario | null>
    create( data : Prisma.ComentarioUncheckedCreateInput ) : Promise<  Comentario | null>
    delete( id : string ) : Promise<  Comentario | null>
    update( id : string , data : ComentarioUpdateInput  ) : Promise<  Comentario | null>
    findComentariosByUser(userId: string): Promise<Comentario[] | null>
    findComentariosByPost( postId : string) : Promise <Comentario[] | null>
    findMany() : Promise< Comentario[] | null > 
}