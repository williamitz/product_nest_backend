// import { registerAs } from "@nestjs/config";

export default () => ({
    
    database: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PSW,
        name: process.env.DB_NAME,
        port: process.env.DB_PORT,
    },

    port: process.env.APP_PORT,
    page_limit: process.env.PAGE_LIMIT,

    typeorm_seeding_factories : process.env.TYPEORM_SEEDING_FACTORIES,
    typeorm_seeding_seeds : process.env.TYPEORM_SEEDING_SEEDS,
    typeorm_seeding_entities: process.env.TYPEORM_SEEDING_ENTITIES,

    auth: {
        jwt_secret: process.env.JWT_SECRET,
        jwt_expires_in: process.env.JWT_EXPIRES_IN,
        strategy: process.env.STRATEGY,
    },

    google: {
        client_id: process.env.CLIENT_ID,
    }
    
});