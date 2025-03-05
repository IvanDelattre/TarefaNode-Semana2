import { Comentario, Prisma } from "@prisma/client";
import { prisma } from "src/lib/prisma";
import { ComentariosRepository, ComentarioUpdateInput } from "../comentarios-repository";


export class PrismaComentarioRepository implements ComentariosRepository  {
    
    async  findById(id : string) : Promise< Comentario | null>{
        const comentario = await prisma.comentario.findUnique({
            where :{
                id
            }
        })
        
        return comentario ; 
    }

    async delete( id : string ) : Promise< Comentario | null> {
        const comentario = await prisma.comentario.delete({
            where : {
                id
            }
        })
        return comentario ; 
    }


    async create( data : Prisma.ComentarioUncheckedCreateInput ) : Promise< Comentario | null>  {
        const comentario = await prisma.comentario.create({
            data
        })
        return comentario
    }


    async update( id : string , data : ComentarioUpdateInput  ) : Promise< Comentario | null>  {
        const comentario = await prisma.comentario.update({
            where : { id } ,
            data:{
                content : data.content , 
                created_at : data.created_at,
                userId : data.userId,
                postId : data.postId
            }
                
        })
        return comentario ; 

    }

    async findComentariosByUser(userId: string): Promise<Comentario[] | null> {
        const comentarios = await prisma.comentario.findMany({
            where : {
                userId 
            }
        })
        return comentarios ; 
    }

    async findComentariosByPost( postId : string) : Promise <Comentario[] | null> {
        const comentarios = await prisma.comentario.findMany({
            where : {
                postId
            }
        })
        return comentarios ; 
    }

    async findMany() : Promise< Comentario[] | null > {
        const comentarios = await prisma.comentario.findMany()
        return comentarios ; 
    }


}