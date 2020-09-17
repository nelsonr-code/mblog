import "../models";
import mongoose from 'mongoose';

export class MongooseBaseRepository {

  constructor(modelName) {
    console.log('inicializndo repo', modelName);
    this._model = mongoose.model(modelName);
  }

  model() { return this._model; }

  findById(id) {
    return this.model().findById(id)
  }

  async find(query, projection, limit, skip) {
    const cursor = this.model().find(query);

    if(projection) {
      cursor.select(projection);
    }

    if(limit) {
      cursor.limit(limit);
    }
    
    if(skip) {
      cursor.skip(skip);
    }

    return await cursor;
  }

  async findOne(query, projection) {
    return await this.model().findOne(query, projection);
  }

  async update(query, update, options) {
    return this.model().update(query, update, options);
  }
}