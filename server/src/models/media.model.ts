import { Ref, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Media {
  @prop({ required: true, trim: true })
  public name: string;

  @prop({ trim: true })
  public description: string;

  @prop({})
  thumbnail: {
    data: Buffer;
    contentType: string;
  };

  @prop({})
  genre: string;

  @prop({ ref: 'User' })
  postedBy: Ref<User>;

  @prop()
  views: string;
}

const mediaModel = getModelForClass(Media);
export default mediaModel;
