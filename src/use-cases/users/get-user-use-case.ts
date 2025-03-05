import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { User } from "@prisma/client"



interface GetUseCaseRequest{
    id : string 
}

interface GetUseCaseResponse{
    user :User 
}

export class GetUserUseCase{
    constructor( private userRepository : PrismaUserRepository ) {}


    async execute({ id } : GetUseCaseRequest  ) : Promise<GetUseCaseResponse>  {
        
        const user = await this.userRepository.findById(id)

        if( !user){
            throw new ResourceNotFoundError()
        }

        return {user }
    }

}