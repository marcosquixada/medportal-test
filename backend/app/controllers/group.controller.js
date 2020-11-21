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
    req.body.groups.forEach(function (val, index) {
        //db.sequelize.query("INSERT INTO usergroups(groupId, userId) values (" + val.groupId + ", " + val.userId + ")");
        UserGroup.create({
            userId: val.userId,
            groupId: val.groupId
        });
    });

    res.send(200).send({ message: "Groups cadastrados com sucesso!" });
}