import { MongooseBaseRepository } from "./MongooseBaseRepository";
import { UserModel } from '../models/';
import mongoose from 'mongoose';
import { UserNotFound } from "../../../domain-model/UserNotFound";

export class UserRepository extends MongooseBaseRepository {

  constructor() {
    super('users');
  }

  async getUserByEmail(email) {

    const user = await this.findOne({ email });

    if(!user) throw new UserNotFound();

    return user;

  }

  async getSocialMediaConfiguration(userId, socialNetworkName) {

    const user = await this.findById(userId);

    if(!user) throw new UserNotFound();

    return user.socialNetworks.find(({ name }) => name === socialNetworkName);
  }
}