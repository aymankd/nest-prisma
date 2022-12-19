import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly usersService: UsersService) {}

  async onApplicationBootstrap() {
    await Promise.all([
      this.query1(),
      this.query2(),
      this.query3(),
      this.query4(),
      this.query5(),
      this.query6(),
      this.query7(),
    ]);
  }

  async query1() {
    const users = await this.usersService.findAll({
      where: {
        firstName: { equals: 'Timber' },
        lastName: { equals: 'Saw' },
      },
    });
    console.log('query1: ', users);
  }

  async query2() {
    const users = await this.usersService.findAll({
      where: {
        NOT: {
          firstName: { equals: 'Timber' },
        },
      },
    });
    console.log('query2: ', users);
  }

  async query3() {
    const users = await this.usersService.findAll({
      where: {
        OR: [
          { firstName: { equals: 'Timber' } },
          { firstName: { equals: 'Mike' } },
        ],
      },
    });
    console.log('query3: ', users);
  }

  async query4() {
    const users = await this.usersService.findAll({
      where: {
        firstName: {
          in: ['Timber', 'Mike'],
        },
      },
    });
    console.log('query4: ', users);
  }

  async query5() {
    const users = await this.usersService.findAll({
      where: {
        age: { lte: 10 },
      },
    });
    console.log('query5: ', users);
  }

  async query6() {
    const users = await this.usersService.findAll({
      where: {
        firstName: { contains: 'er' },
      },
    });
    console.log('query6: ', users);
  }

  async query7() {
    const users = await this.usersService.findAll({
      where: {
        AND: [{ age: { gte: 15 } }, { age: { lte: 25 } }],
      },
    });
    console.log('query7: ', users);
  }
}
