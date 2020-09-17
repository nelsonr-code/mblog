import * as mongoose from 'mongoose';
import userSchema from './User.model';
import postSchema from './Post.model';

mongoose.model('users', userSchema);
mongoose.model('UserSocialMediaPost', postSchema);
