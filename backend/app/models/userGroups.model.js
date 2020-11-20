const db = require("../config/db.config");
const User = db.User;
const Group = db.Group;

module.exports = (sequelize, Sequelize) => {
    const UserGroups = sequelize.define('usergroups', {
        UserId: {
            type: Sequelize.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        },
        GroupId: {
            type: Sequelize.INTEGER,
            references: {
                model: Group,
                key: 'id'
            }
        }
    });

    return UserGroups;
} 