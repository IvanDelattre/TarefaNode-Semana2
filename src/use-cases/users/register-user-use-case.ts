import { PrismaUserRepository } from "src/repositories/prisma/prisma-user-repository";
import { UserAlreadyExists } from "../errors/usuer-already-exist";
import { hash } from "bcryptjs";


interface RegisterUseCaseRequest{
    name : string
    email : string
    senha : string
    foto : string
}



export class RegisterUseCase{
    constructor( private userRepository : PrismaUserRepository) {}


    async execute({ name , email , senha , foto } : RegisterUseCaseRequest   ){
        
        const userWithSameEmail =  await  this.userRepository.findByEmail(email) 

        if( userWithSameEmail){
            throw new UserAlreadyExists 
        }

        const password = await hash(senha , 6 )

        
        await this.userRepository.create({
            name,
            email,
            foto,
            senha : password
        })
    }


}