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
});