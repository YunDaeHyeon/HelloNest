import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  /*
    주의 : GET 처리를 할 때 라우트 파라미터 (:id)와 같은 것을 매핑한 함수가
    상단에 있을 시 나머지 GET 처리는 동작하지 않는다.
  */
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // @Query()에 포함되는 파라미터는 쿼리스트링 변수를 의미
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `${searchingYear}년도에 제작된 영화를 검색중입니다.`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') moveId: string) {
    return this.moviesService.deleteOne(moveId);
  }

  @Patch('/:id')
  path(@Param('id') moveId: string, @Body() updateData) {
    // 업데이트할 영화의 id와 클라이언트로 넘어온 오브젝트 반환
    return {
      updateMovie: moveId,
      ...updateData,
    };
  }
}

/*
@Param 데코레이터 : URL에 존재하는 Variable를 가져옴
@Query 데코레이터 : Query 파라미터를 가져옴
ex) @Param -> localhost:3000/movies/123 실행 시 123 가져옴
ex) @Query -> locaohost:3000/movies/search?year=123 실행 시 123 가져옴
*/
