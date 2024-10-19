import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { DataSource } from 'typeorm';
import { Todo } from './todo/entities/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // ประเภทของฐานข้อมูลที่ใช้
      host: 'project-db.cvk66kkosgcr.ap-southeast-1.rds.amazonaws.com', // Endpoint ของ RDS หรือฐานข้อมูล
      port: 3306, // พอร์ตของ MySQL
      username: 'admin', // ชื่อผู้ใช้
      password: 'pass1234', // รหัสผ่าน
      database: 'project',
      entities: [Todo],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TodoModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
