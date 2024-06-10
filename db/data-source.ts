import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "interviewTracker",
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "asdfhasdfkjhasdfqwye8rudsaifnzxvnwrglkz",
    synchronize: false
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;