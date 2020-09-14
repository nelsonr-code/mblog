import mongoose from "mongoose";

const userSocialMediaPostSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    user_social_media: {
        type: mongoose.Schema.Types.ObjectId, ref: 'UserSocialMedia',
        required: true
    },  
    post_id: {
        type: String,
        required: true
    },
    post_data: {
        type: String,
        required: true
    },
    post_date: {
        type: Date
    },
    total_likes: {
        type: Number,
        required: true
    },
    total_reposts: {
        type: Number,
        required: true
    },
    total_awnsers: {
        type: Number
    },
    hashtags: [],
    urls: [],
    post_metadata: [],
    repost_socials: [],
    repost: {
        type: Number
    },
    repost_date: {
        type: Date
    },
    original_link : {
        type: String
    },
    repost_id :  {
        type: Number
    },
    title : {
        type: String
    },
    video_id : {
        type : String
    }
});

export default userSocialMediaPostSchema;
