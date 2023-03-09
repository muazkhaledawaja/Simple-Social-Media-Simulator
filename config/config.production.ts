/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default () => ({
    database: {
        dialect: 'mysql',
        host: 'localhost',
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        username: process.env.DATABASE_USERNAME || 'root',
        password: process.env.DEV_DATABASE_PASSWORD,
        database: process.env.DEV_DATABASE_NAME || 'social_media',
    },
});
