import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  dateToPublish: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsString()
  @IsNotEmpty()
  socialMedia: string;
}
