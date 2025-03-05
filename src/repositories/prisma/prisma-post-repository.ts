import { Posts, Prisma } from "@prisma/client";
import { PostsRepository, PostUpdateInput } from "../posts-repository";
import { prisma } from "src/lib/prisma";



export class PrismaPostsRepository implements PostsRepository {
    
    async  findById(id : string) : Promise< Posts | null>{
        const post = await prisma.posts.findUnique({
            where :{
                id
            }
        })
        
        return post
    }

    async delete( id : string ) : Promise< Posts | null> {
        const post = await prisma.posts.delete({
            where : {
                id
            }
        })
        return post ; 
    }


    async create( data : Prisma.PostsUncheckedCreateInput ) : Promise< Posts | null>  {
        const post = await prisma.posts.create({
            data
        })
        return post
    }

    async update( id : string , data : PostUpdateInput  ) : Promise<Posts | null>  {
        const post = await prisma.posts.update({
            where : { id } ,
            data:{
                content : data.content , 
                created_at : data.created_at,
                userId : data.userId
            }
                
        })
        return post ; 

    }

    async findPostsByUser(userId: string): Promise<Posts[] | null> {
        const posts = await prisma.posts.findMany({
            where : {
                userId 
            }
        })
        return posts ; 
    }

    async findMany() : Promise< Posts[] | null > {
        const posts = await prisma.posts.findMany()
        return posts 
    }

}