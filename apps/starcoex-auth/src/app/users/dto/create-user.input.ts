import { InputType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(User, [
  'email',
  'password',
  'phone_number',
  'name',
]) {}
