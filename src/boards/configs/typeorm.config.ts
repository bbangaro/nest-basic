import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password:'tjsk1004',
    database: 'board-app',

    // entities: [__dirname + '/../**/*.entity.{js.ts}', 'board'],
    // entities: [join(__dirname, '..', 'modules', '**', '*.entity{.ts,.js}')],
    entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    synchronize: true
}