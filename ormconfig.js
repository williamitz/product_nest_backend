module.exports = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PSW,
    database: process.env.DB_NAME,
    port: +process.env.DB_PORT,

    entities: [process.env.TYPEORM_SEEDING_ENTITIES],
    seeds: [process.env.TYPEORM_SEEDING_SEEDS],
    factories: [process.env.TYPEORM_SEEDING_FACTORIES],
}