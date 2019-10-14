import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './security/passport.jwt.strategy';
import { AuthModule } from './module/auth.module';
import { ormconfig } from './orm.config';
import { DemetraUserModule } from './module/demetra-user.module';
import { SingleCourseModule } from './module/single-course.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    DemetraUserModule,
    SingleCourseModule
    // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
  ],
  controllers: [
    // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
  ],
  providers: []
})
export class AppModule {}
