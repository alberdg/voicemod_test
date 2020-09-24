import mongoose from 'mongoose';

// An interface that describes the properties
// that a Country Model has
interface CountryModel extends mongoose.Model<CountryDoc> {
}

// An interface that describes the properties
// that a Country Document has
export interface CountryDoc extends mongoose.Document {
  name: string;
}

// Country schema to be exposed
const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
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
        delete ret.__v; // Very specific to mongodb
      }
    }
  }
);



const Country = mongoose.model<CountryDoc, CountryModel>('Country', countrySchema);

export { Country };
