import { Prisma, User } from "@prisma/client";


export interface UserUpdateInput{
    name?: string
    email?: string
    senha?: string
    foto?: string
}



export interface UsersRepository{

    create(data : Prisma.UserCreateInput ) : Promise<User>

    findById( userid : string  ) : Promise< User | null > 
    findByEmail( email : string ) : Promise < User | null >


    delete( userId : string ) :  Promise < User | null > 
    update( id : string , data : UserUpdateInput  ) : Promise< User | null > 

    findMany() : Promise< User[] | null > 
    
}