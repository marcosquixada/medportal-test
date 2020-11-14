const db = require('../models');
const Group = db.group;
const User = db.user;
const UserGroup = db.user_groups;

exports.listAll = (req, res) => {
    Group.findAll().then((groups) => {
        res.status(200).send({
            groups: groups
        });
    });
};

exports.postGroups = (req, res) => {
    req.body.groups.forEach(function (val, index) {
        UserGroup.create({
            userId: val.userId,
            groupId: val.groupId
        });
    });
    
    res.send(200).send({ message: "Groups cadastrados com sucesso!" });
}