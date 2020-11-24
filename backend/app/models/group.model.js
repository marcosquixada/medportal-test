module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("groups", {
        name: {
            type: Sequelize.STRING
        }, tag: {
            type: Sequelize.STRING
        }
    });

    return Group;
};