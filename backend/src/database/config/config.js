require('dotenv').config();

module.exports = {
    "development": {
        "host": "localhost",
        "username": "root",
        "password": process.env.MYSQL_ROOT_PASSWORD,
        "database": process.env.MYSQL_DATABASE,
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