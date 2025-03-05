import { Prisma, User } from "@prisma/client";
import { prisma } from "src/lib/prisma";
import { UsersRepository, UserUpdateInput } from "../users-repository";


export class PrismaUserRepository implements UsersRepository {
    
    async create(data : Prisma.UserCreateInput ) {
        const user = await prisma.user.create({
            data
        })
        return user ; 
    }


    async findById( id : string  ) {
        const user = await prisma.user.findUnique({
            where :{
                id
            }
        })
        return user
    }

    async findByEmail( email : string ) {
        const user = await prisma.user.findUnique({
            where : {
                email 
            }
        })
        return user         
    }

    async delete( id : string ) {
        const user = await prisma.user.delete({
            where : {
                id
            }
        })
        return user
    }

    async update( id : string , data : UserUpdateInput  ) : Promise<User | null>  {
        const user = await prisma.user.update({
            where : { id } ,
            data:{
                name : data.name ,
                email : data.email,
                senha : data.senha,
                foto : data.foto
            }
                
        })
        return user ; 

    }

    async findMany(): Promise <User[] | null> {
        const users = await prisma.user.findMany()
        return users ; 
    }


}