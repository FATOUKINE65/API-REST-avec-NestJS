import { Connection } from 'typeorm';
export declare class DatabaseService {
    private connection;
    constructor(connection: Connection);
    testConnection(): Promise<void>;
}
