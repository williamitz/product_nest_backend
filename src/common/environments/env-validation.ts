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
})