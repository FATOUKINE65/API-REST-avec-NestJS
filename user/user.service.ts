import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


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

            console.log(userData)
            
            this.userService.save(nouveau_user)

            return {message: "Compte cree avec succee", success:true}
  
        } catch (error) {
            
            console.log(error)
            return {message: 'Erreur lors de la creation de compte', success:false}
        }
    }

    //connexion
    async connexion (userData: User):Promise<{ message:string; success: boolean, TOKEN?:string}> {

        try {

            //Rechercher le user
            const user_exist = await this.userService.findOne({where :{email: userData.email}})

            //Si le user n'existe pas
            if(!user_exist){
                return {message:"L'email ou mot de passe est incorrect", success:false}
            }

            //Reverifier mot de passe
            const verifier_motDePasse = await bcrypt.compare(userData.password, user_exist.password)

            if(!verifier_motDePasse){
                return {message:"L'eamil ou mot de pasee est incorrect", success: false}
            }
            const token = jwt.sign({ id: user_exist.id },
                process.env.CLE_SECRETE,{
                    expiresIn:'2d'
                })

              return {message: "Connexion reussie", success: true, TOKEN : token}

            
            
        } catch (error) {

            console.log('Echec de la connexion')
            return {message: "Erreur lors de la connexion", success:false}
            
        }

    }
}
