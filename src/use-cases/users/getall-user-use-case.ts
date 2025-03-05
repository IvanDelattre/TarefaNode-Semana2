import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { User } from "@prisma/client"




interface GetAllUsersUseCaseResponse {
    users :  User[] 
}

export class GetAllUserUseCase{
    constructor( private userRepository : PrismaUserRepository ) {}


    async execute() : Promise<GetAllUsersUseCaseResponse>  {
        
        const users = await this.userRepository.findMany()

        if( !users){
            throw new ResourceNotFoundError()
        }

        return  {users }  ; 
    }

}