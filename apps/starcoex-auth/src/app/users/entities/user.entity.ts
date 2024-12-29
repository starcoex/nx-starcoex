import {
  ObjectType,
  Field,
  Int,
  registerEnumType,
  InputType,
} from '@nestjs/graphql';
import { AbstractEntity, UserRole } from '@starcoex/nestjs';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('AvatarsInput', { isAbstract: true })
@ObjectType()
export class Avatars extends AbstractEntity {
  @Field()
  @IsString()
  public_id: string;

  @Field()
  @IsString()
  url: string;

  @Field(() => Int)
  @IsNumber()
  userId: number;
}

@InputType('UserInput', { isAbstract: true })
@ObjectType()
export class User extends AbstractEntity {
  @Field()
  @IsNotEmpty({ message: '이름은 필수입니다.' })
  @IsString()
  @Length(2, 30, {
    message: '이름은 최소 한글자 이상이거나 최대 15글자 이하입니다.',
  })
  name: string;

  @Field()
  @IsNotEmpty({ message: '메일은 필수 입니다.' })
  @IsEmail({}, { message: '메일 형식이 잘못 되었습니다.' })
  email: string;

  @Field()
  @IsString()
  @MinLength(6, { message: '비밀번호는 최소 6 문자 이상입니다.' })
  password: string;

  @Field()
  @IsNotEmpty({ message: '번호는 필수입니다.' })
  @IsPhoneNumber('KR', { message: '번호가 한국이 아닙니다.' })
  phone_number: string;

  @Field({ nullable: true })
  @IsOptional()
  refresh_token?: string;

  @Field(() => UserRole, { nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  roles?: UserRole;

  @Field(() => Avatars, { nullable: true })
  avatars?: Avatars;
}
