import { Schema, model, Document, Model } from "mongoose";

export interface IServer {
  name: string;
  owner: Schema.Types.ObjectId;
  channels: Array<Schema.Types.ObjectId>;
}

interface ServerDocument extends IServer, Document {
};

interface ServerModel extends Model<ServerDocument> {
};

const ServerSchema = new Schema<ServerDocument>({
  name: {
    type: String,
    required: [true, 'Please enter a server name!'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  channels: [{ type: Schema.Types.ObjectId, ref: 'Channel'}]
});

export default model<ServerDocument, ServerModel>('Server', ServerSchema);