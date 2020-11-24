const express = require("express");
const bodyParser = require("body-parser");
//const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

//app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Group = db.group;

//grop and create database
db.sequelize.sync({force: true}).then(() => {
    console.log('Carregando Grupos Padrão...');
    initial();
});

//const queryInterface = db.sequelize.getQueryInterface();

function initial() {
    //queryInterface.addColumn('usergroups', 'createdAt', { type: db.Sequelize.DATE });
    //queryInterface.addColumn('usergroups', 'updatedAt', { type: db.Sequelize.DATE });

    Group.create({
        id: 1,
        name: "Bares & Restaurantes",
        tag: "grupo-bares"
    });

    Group.create({
        id: 2,
        name: "Lazer & Viagens",
        tag: "grupo-lazer"
    });

    Group.create({
        id: 3,
        name: "Moda Feminina",
        tag: "grupo-moda-feminina"
    });

    Group.create({
        id: 4,
        name: "Moda Masculina",
        tag: "grupo-moda-masculina"
    });
}

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Bem vindo a Med Portal." });
});

// routes
require('./app/routes/auth.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});