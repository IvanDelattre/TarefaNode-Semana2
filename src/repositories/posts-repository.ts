import { Posts, Prisma } from "@prisma/client";


export interface PostUpdateInput{
    content?: string
    created_at?: Date
    userId?: string
}



export interface PostsRepository{
    
    findById(id : string) : Promise<Posts | null>
    create( data : Prisma.PostsUncheckedCreateInput ) : Promise< Posts | null > 
    delete( id : string ) : Promise< Posts | null > 
    update( id : string , data : PostUpdateInput  ) : Promise< Posts | null >

    findPostsByUser( userId : string) : Promise< Posts[] | null > 
    findMany() : Promise< Posts[] | null >  
}