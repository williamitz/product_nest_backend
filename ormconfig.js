module.exports = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PSW,
    database: process.env.DB_NAME,
    port: +process.env.DB_PORT,

    entities: ['src/**/*.entity.{ts,js}'],
    seeds: ['src/common/seeds/**/*{.ts,.js}'],
    factories: ['src/common/factories/**/*{.ts,.js}'],
}