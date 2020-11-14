const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Group = db.group;

//grop and create database
db.sequelize.sync({ force: true }).then(() => {
    console.log('Carregando Grupos Padrão...');
    initial();
});

function initial() {
    Group.create({
        id: 1,
        name: "Bares & Restaurantes"
    });

    Group.create({
        id: 2,
        name: "Lazer & Viagens"
    });

    Group.create({
        id: 3,
        name: "Moda Feminina"
    });

    Group.create({
        id: 4,
        name: "Moda Masculina"
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