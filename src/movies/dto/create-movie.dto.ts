import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMoveDTO {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional() // 유효성 검사 과정에서 해당 필드가 없으면 유효성 검사를 스킵한다. 있으면 설정된 검사 수행 (값이 null or undefined 이어도 검사 무시)
  @IsString({ each: true }) // 모든 배열 요소를 검사시키는 옵션
  readonly genres: string[];
}
