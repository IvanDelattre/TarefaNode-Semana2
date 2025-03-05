//codigo de user

import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import { User } from "@prisma/client"
import { UserUpdateInput } from "src/repositories/users-repository"
import { compare, hash } from "bcryptjs"



interface UpdateUserUseCaseRequest{
    id : string 
    data : UserUpdateInput
}

interface GetUseCaseResponse{
    user :User 
}

export class UpdateUserUseCase{
    constructor( private userRepository : PrismaUserRepository ) {}


    async execute({id , data} : UpdateUserUseCaseRequest ): Promise<GetUseCaseResponse> {
         
        const user = await this.userRepository.findById(id) 
        if(!user) throw new ResourceNotFoundError
        
        if(data.senha ){
            const isSamePassword = await compare( data.senha , user.senha )
            if( isSamePassword) throw new Error('As senhas devem ser diferentes')
            
                data.senha= await hash(data.senha , 6) 
    
        }


        const userUpdated = await this.userRepository.update(id , data)
        
        if(!userUpdated) throw new ResourceNotFoundError
        
        return { user :  userUpdated }
    }

}