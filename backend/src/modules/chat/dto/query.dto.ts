import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsArray,
  IsIn,
  ValidateNested,
  ArrayMaxSize,
} from 'class-validator';

export class ChatHistoryMessageDto {
  @IsIn(['user', 'assistant'])
  role: 'user' | 'assistant';

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class QueryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  question: string;

  @IsString()
  @IsNotEmpty()
  namespace: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => ChatHistoryMessageDto)
  history?: ChatHistoryMessageDto[];
}
