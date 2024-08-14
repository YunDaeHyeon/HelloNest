import { PartialType } from '@nestjs/mapped-types';
import { CreateMoveDTO } from './create-movie.dto';

export class UpdateMovieDTO extends PartialType(CreateMoveDTO) {}

/*  PartialType을 사용하기 전 DTO 선언
"?" 연산자를 통해 부분 업데이트 허용
import { IsNumber, IsString } from 'class-validator';

export class UpdateMovieDTO {
  @IsString()
  title?: string;

  @IsNumber()
  year?: number;

  @IsString({ each: true })
  genres?: string[];
}

mapped-types란 무엇인지 정리
*/
