import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  name: string;
  lastname: string;
  email: string;
  password: string;
  country: string;
  telephone: string;
  postcode: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
  country: string;
  telephone: string;
  postcode: string;
}

// User schema to be exposed
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    telephone: {
      type: String,
      required: true
    },
    postcode: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        /**
         * Transforming _id to id as a best practice this is not the case
         * but this system could be part of a bigger system using other databases
         * different from mongodb where _id is not the standard naming
         */
        ret.id = ret._id;
        delete ret._id;
        delete ret.password; // Removing password for enhanced security
        delete ret.__v; // Very specific to mongodb
      }
    }
  }
);

/**
 * Hook to execute before a document is saved
 * Note no arrow function is used to preserve the value of this to be equal to
 * the user document
 */
userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    //TODO Need to hash the user password before saving it
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
