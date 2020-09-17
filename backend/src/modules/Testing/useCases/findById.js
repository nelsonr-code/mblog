import { BaseUseCase } from "../../BaseUseCase";
import mongoose from 'mongoose';
mongoose.model('User', new mongoose.Schema({}, {strict: false}))

export class FindById extends BaseUseCase {

  constructor(){
    super();
    this.Model = mongoose.model('User');
  }

  async executeImpl() {
    console.log("voy con la imp", this.Model.find)
    const data = await this.Model.find();
    return { data };
  };
}