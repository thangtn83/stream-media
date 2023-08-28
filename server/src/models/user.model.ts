import { getModelForClass, index, modelOptions, pre, prop } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';
@index({ email: 1 })
@pre<User>('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);
})
@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})
export class User {
  @prop({ required: true })
  public name: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true, minLength: 6, maxLength: 32, select: false })
  public password: string;

  @prop({ default: 'user' })
  public role: string;

  async comparePassword(hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

const userModel = getModelForClass(User);
export default userModel;
