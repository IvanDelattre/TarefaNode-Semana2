import { Like, Prisma } from "@prisma/client";
import { prisma } from "src/lib/prisma";
import { LikesRepository } from "../like-repository";




export class PrismaLikesRepository implements LikesRepository {
    
    async  findById(id : string) : Promise< Like | null>{
        const like = await prisma.like.findUnique({
            where :{
                id
            }
        })
        
        return like ; 
    }

    async delete( id : string ) : Promise< Like | null> {
        const like = await prisma.like.delete({
            where : {
                id
            }
        })
        return like ; 
    }


    async create( data : Prisma.PostsUncheckedCreateInput ) : Promise< Like | null>  {
        const like = await prisma.like.create({
            data
        })
        return like
    }

    

    async findLikeByUser(userId: string): Promise< Like[] | null> {
        const posts = await prisma.like.findMany({
            where : {
                userId 
            }
        })
        return posts ; 
    }

    async findLikeByPost( postId : string) : Promise < Like[] | null> {
        const like = await prisma.like.findMany({
            where : {
                postId
            }
        })
        return like ; 
    }

    async findLikeByComentario( commentId : string) : Promise < Like[] | null> {
        const like = await prisma.like.findMany({
            where : {
                commentId
            }
        })
        return like ; 
    }




    


}