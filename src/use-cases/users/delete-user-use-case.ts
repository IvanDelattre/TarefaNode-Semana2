import { Prisma, User } from "@prisma/client";
import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { UsersRepository } from "src/repositories/users-repository";


interface DeleteUserUseCaseRequest{
    id : string
}


interface DeleteUserUseCaseResponse {
    user: User
}


export class DeleteUseCse{

    constructor( private  prismaUserRepository : UsersRepository ) {}

        async execute( {id } : DeleteUserUseCaseRequest  ) : Promise<DeleteUserUseCaseResponse>  {
            
            const user = await this.prismaUserRepository.delete( id ) 
            
            if( !user  ){
                throw new ResourceNotFoundError()
            }

            return { user }
        }



    
}