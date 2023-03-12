/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default () => ({
    database: {
        dialect: 'mysql',
        host: process.env.DB_HOST ||'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'social_media',
    },
});
