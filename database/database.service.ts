import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DatabaseService {
    constructor(private connection : Connection){}

    async testConnection(){
        try {
           await this.connection.query('SELECT 1')
           console.log('Connexion au BD bien etabli...')
        } catch (error) {
            console.error('Connexion BD non etabli...')
        }
    }
}
