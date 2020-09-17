import dotenv from 'dotenv';

const path = require('path');
const conf = require('dotenv').config({ path: path.join(__dirname, `../../../.env`) })
// console.log(conf);
import fs from "fs-extra";

const config = {
    DB: {
        MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
        MONGODB_USER: process.env.MONGODB_USER,
        MONGODB_PASSWD: process.env.MONGODB_PASSWORD,
        MONGODB_URI: process.env.MONGODB_URI || '',
    },
    PORT: process.env.PORT,
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    SOCIAL_CONFIG_REDIRECT: process.env.FRONTEND_URL,
    CERTIFICATE_OPTIONS: {
        // KEY: fs.readFileSync(''),
        // CERT: fs.readFileSync('')
    },
    FACEBOOK: {
        FB_KEY: process.env.FACEBOOK_KEY,
        FB_SECRET: process.env.FACEBOOK_SECRET,
        FB_CALLBACK: `${process.env.BACKEND_URL}/facebook-callback`
    },
    INSTAGRAM: {
        IG_KEY: process.env.INSTAGRAM_KEY,
        IG_SECRET: process.env.INSTAGRAM_SECRET,
        IG_CALLBACK: `${process.env.BACKEND_URL}/instagram-callback`
    },
    TWITTER: {
        TW_KEY: process.env.TWITTER_KEY,
        TW_SECRET: process.env.TWITTER_SECRET,
        TW_CALLBACK: `${process.env.BACKEND_URL}/twitter-callback`
    },
    LINKEDIN: {
        LN_KEY: process.env.LINKEDIN_KEY,
        LN_SECRET: process.env.LINKEDIN_SECRET,
        LN_CALLBACK: `${process.env.BACKEND_URL}/linkedin-callback`
    },
    WORDPRESS: {
        WP_KEY: process.env.WORDPRESS_KEY,
        WP_URL: process.env.WORDPRESS_URL,
        // WP_CALLBACK: process.env.WORDPRESS_CALLBACK
    },
    GOOGLE: {
        GG_KEY: process.env.GOOGLE_KEY,
        GG_SECRET: process.env.GOOGLE_SECRET,
        GG_CALLBACK: `${process.env.BACKEND_URL}/google-callback`
    },
}
export default config;