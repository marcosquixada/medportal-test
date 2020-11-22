//const { DataTypes } = require('sequelize/types');
const db = require('../models');
const Group = db.group;
const User = db.user;
const UserGroups = db.usergroups;

var UserGroup = db.sequelize.define('usergroups', {
    userId: db.Sequelize.INTEGER,
    groupId: db.Sequelize.INTEGER
}, {
    tableName: 'usergroups'
});

exports.listAll = (req, res) => {
    Group.findAll().then((groups) => {
        res.status(200).send({
            groups: groups
        });
    });
};

exports.postGroups = (req, res) => {
    console.log(req.body.groups);
    UserGroup.destroy({
        where: {
            UserId: req.body.userId
        }
    });
    req.body.groups.forEach(function (val, index) {
        if(val.check){
            UserGroup.create({
                userId: req.body.userId,
                groupId: val.id,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
    });

    res.send(200).send({ message: "Grupos cadastrados com sucesso!" });
}