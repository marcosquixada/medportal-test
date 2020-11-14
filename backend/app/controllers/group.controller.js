const db = require('../models');
const Group = db.group;

exports.listAll = (req, res) => {
    Group.findAll().then((groups) => {
        res.status(200).send({
            groups: groups
        });
    });
};