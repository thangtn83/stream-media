import { Ref, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { User } from './user.model';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Media {
  @prop({ required: true, trim: true })
  public title: string;

  @prop({ trim: true })
  public description: string;

  @prop({})
  thumbnail: {
    data: Buffer;
    contentType: string;
  };

  @prop({})
  genre: string[];

  @prop()
  actors: string[];

  @prop()
  director: string;

  @prop({ ref: 'User' })
  postedBy: Ref<User>;

  @prop()
  views: number;

  @prop()
  runTime: number;

  @prop()
  released: TimeStamps;

  @prop()
  ratings: {
    source: string;
    value: string;
  }[];
}

const mediaModel = getModelForClass(Media);
export default mediaModel;
