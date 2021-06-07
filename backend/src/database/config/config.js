require('dotenv').config();

module.exports = {
    "development": {
        "host": process.env.PASSWORD,
        "username": process.env.USER,
        "password": process.env.ROOT_PASSWORD,
        "database": process.env.DATABASE,
        "migrationStorageTableName": "sequelize_meta",
        "dialect": "mysql",
        "operatorsAliases": 0,
        "logging": false,
        "define": {
            "underscored": true,
            "underscoredAll": true,
            "createdAt": "created_at",
            "updatedAt": "updated_at"
        }
    },
}