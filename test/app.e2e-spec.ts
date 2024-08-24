import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach 대신 beforeAll을 사용하여 모든 테스트마다 테스트 모듈이 재생성되는 것을 막는다.
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // 테스팅 모듈 생성
    app = moduleFixture.createNestApplication();
    // 테스팅 모듈 또한 실제 서비스 모듈과 같이 동일한 설정을 해야한다. (Pipe 적용)
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  // /movie API test
  describe('/movies', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Movie',
          genres: ['test'],
          year: 2000,
        })
        .expect(201);
    });
    // 잘못된 영화가 생성되었을 때 제대로 400가 출력되는지 테스트
    // 이때, 400코드가 출력되는 이유는 Global Pipe 설정 옵션 중 `forbidNonWhitelisted`가 활성화 되어있기에 400 출력
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Movie',
          genres: ['test'],
          year: 2000,
          hack: 'thing',
        })
        .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  // route test
  describe('/movies/:id', () => {
    // todo()는 아직 구현되지 않은 테스트를 정의한다. (계획을 세워놓는다는 느낌)
    // it.todo('GET');
    // it.todo('DELETE');
    // it.todo('PATCH');
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });

    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          title: 'Updated Test',
        })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
