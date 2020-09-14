import mongoose from "mongoose";
import bcrypt from "bcrypt";
import constants from '../../../constants';
// define a schema

const SocialNetworkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    default: ''
  },
  lastUpdated: {
    type: Date
  }
});

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  appToken: {
    type: String,
  },
  configurations: {
    publishDraft: {
      type: Boolean,
      default: true,
    },
    maxPosts: {
      type: Number,
      default: 10,
    },
    automaticRepost: {
      type: Boolean,
      default: true,
    },
    publicationState: {
      type: String,
      enum: Object.values(constants.YT_PUBLICATION_STATES),
      default: constants.YT_PUBLICATION_STATES.UNLISTED,
    },
    useOriginalDate: {
      type: Boolean,
      default: false,
    },
    additionalVideoAndTranscript: {
      type: Boolean,
      default: false,
    },
    linkOriginalPost: {
      type: Boolean,
      default: false,
    },
  },
  active: {
    type: Boolean,
    default: false,
  },
  socialNetworks: {
    type: [SocialNetworkSchema],
    default: []
  },
  profile: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: ''
    }
  },
  roles: {
    type: [String],
    default: ['user']
  }
});

//#region Middlewares
userSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.post("save", function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('email must be unique'));
  } else {
    next(error);
  }
});

//#endregion

//#region  Methods
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

userSchema.methods.updateAccessToken = function(accessToken, name, url) {
  if(!this.socialNetworks.find(e => e.name === name)) {
    this.socialNetworks.push({
      name,
      accessToken, 
      url,
      lastUpdated: new Date()
    });
  } else {
    const socialNetwork = this.socialNetworks.find(e => e.name === name);
    socialNetwork.accessToken = accessToken;
    socialNetwork.url = url;
    socialNetwork.lastUpdated = new Date()
  }

  return this.save();
}

userSchema.methods.getSessionData = function () {

  let userObject = {
    id: this._id,
    displayName: `${ this.profile.firstName } ${ this.profile.lastName }`,
    photoUrl: this.profile.picture,
    socialNetworks: this.socialNetworks,
    roles: ['user']
  }

  return userObject;
};

//#endregion

export default userSchema;
