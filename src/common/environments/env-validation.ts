import * as Joi from "joi";

export const envValidation = Joi.object({

    DB_TYPE: Joi.string().default('postgres'),
    DB_HOST: Joi.string().default('localhost'),
    DB_USER: Joi.string().default('postgres'),
    DB_PSW: Joi.string().default('N3stB@ckend'),
    DB_NAME: Joi.string().default('shell_db'),
    DB_PORT: Joi.number().default(5435),

    APP_PORT: Joi.number().default(3000),

    PAGE_LIMIT: Joi.number().default(10),

    TYPEORM_SEEDING_ENTITIES: Joi.string().default('src/**/*.entity.{ts,js}'),
    TYPEORM_SEEDING_SEEDS: Joi.string().default('src/common/seeds/**/*{.ts,.js}'),
    TYPEORM_SEEDING_FACTORIES: Joi.string().default('src/common/factories/**/*{.ts,.js}'),

    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().required(),
    STRATEGY: Joi.string().required(),
})