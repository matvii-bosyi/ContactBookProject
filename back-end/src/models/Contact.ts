import { Schema, model, Document } from 'mongoose'

export interface IContact extends Document {
  name: string;
  phoneNumber: string;
  gmail?: string;
  note?: string;
  discord?: string;
  telegram?: string;
  github?: string;
}

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^\+?[0-9\s\-]{7,15}$/,
      unique: true,
      trim: true,
    },
    gmail: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    note: {
      type: String,
      required: false,
      trim: true,
    },
    discord: {
      type: String,
      required: false,
      trim: true,
      match: [/^https:\/\/discord\.com\/.+$/, 'Please fill a valid Discord link'],
    },
    telegram: {
      type: String,
      required: false,
      trim: true,
      match: [/^https:\/\/t\.me\/.+$/, 'Please fill a valid Telegram link'],
    },
    github: {
      type: String,
      required: false,
      trim: true,
      match: [/^https:\/\/github\.com\/.+$/, 'Please fill a valid Github link'],
    },
  },
  {
    timestamps: true,
  }
)

export default model<IContact>('Contact', contactSchema);