import { Schema, model, Document } from "mongoose";

export interface IMessage {
  from: Schema.Types.ObjectId;
  to: Schema.Types.ObjectId;
  toType: string;
  data: string;
  dataType: string,
  time: string;
};

export interface MessageDocument extends IMessage, Document {};

const MessageSchema = new Schema<MessageDocument>({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'toType',
  },
  toType: {
    type: String,
    required: true,
    enum: ['User', 'Channel'],
  },
  data: {
    type: String,
    required: true,
  },
  dataType: {
    type: String,
    required: true,
    enum: ['TEXT', 'IMAGE'],
  },
  time: {
    type: String,
    required: true,
  }
});

export default model('Message', MessageSchema);