import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userService : Repository<User>
    ){}


    //inscription
    async inscription (userData:User):Promise<{ message:string; success: boolean}> {
        
        try {
           
            const user_exist = await this.userService.findOne({where: {email:userData.email}})

            if(user_exist){
                return { message:"L'email existe deja",success: false}
            }

            const motDePasse_a_hasher = await bcrypt.genSalt(10)

            const motDePsse_hasher = await bcrypt.hash(userData.password, motDePasse_a_hasher)

            userData.password = motDePsse_hasher

            const nouveau_user = await this.userService.create(userData)

            this.userService.save(nouveau_user)

            return {message: "Compte cree avec succee", success:true}
  
        } catch (error) {
            
            console.log(error)
            return {message: 'Erreur lors de la creation de compte', success:false}
        }
    }
}
