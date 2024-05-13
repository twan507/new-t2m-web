import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectConnection() private readonly dbConnection: Connection
    ) { }

    async findCollectionsList() {
        const collections = await this.dbConnection.db.listCollections().toArray();
        return collections.map(collection => collection.name);
    }

    async findAllInCollection(collectionName: string) {
        const collection = this.dbConnection.collection(collectionName);
        if (!collection) {
            throw new NotFoundException(`Collection '${collectionName}' not found`);
        }
        return await collection.find().toArray();
    }
}
