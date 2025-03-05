import { Comentario,  Like,  Prisma } from "@prisma/client";




export interface LikesRepository{
    
    findById(id : string) : Promise<  Like | null>
    create( data : Prisma.LikeUncheckedCreateInput ) : Promise<  Like | null>
    delete( id : string ) : Promise<  Like | null>
    
    findLikeByUser(userId: string): Promise< Like[] | null>
    findLikeByPost( postId : string) : Promise <Like[] | null>
    findLikeByComentario( commentId : string ) : Promise <Like[] | null>
}