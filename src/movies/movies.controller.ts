import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return '모든 영화를 반환합니다.';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `아이디가 ${movieId}인 영화를 불러왔습니다.`;
  }

  @Post()
  create() {
    return '영화를 생성하였습니다.';
  }

  @Delete('/:id')
  remove(@Param('id') moveId: string) {
    return `아이다가 ${moveId}인 영화를 삭제하였습니다.`;
  }

  @Patch('/:id')
  path(@Param('id') moveId: string) {
    return `아이다가 ${moveId}인 영화를 수정하였습니다.`;
  }
}
