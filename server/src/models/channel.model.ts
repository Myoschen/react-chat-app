import { Schema, model, Document, Model } from "mongoose";

export interface IChannel {
  name: string;
}

interface ChannelDocument extends IChannel, Document {
};

interface ChannelModel extends Model<ChannelDocument> {
};

const ChannelSchema = new Schema<ChannelDocument>({
  name: {
    type: String,
    required: [true, 'Please enter a server name!'],
  },
});

export default model<ChannelDocument,ChannelModel>('Channel', ChannelSchema);