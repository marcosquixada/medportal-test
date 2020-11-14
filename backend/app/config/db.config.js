module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "489021",
    DB: "medportal-test",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};