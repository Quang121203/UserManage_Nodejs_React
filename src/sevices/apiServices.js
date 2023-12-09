const db = require("../models/index.js");

const bcrypt = require("bcrypt");

const hashPass = (pass) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const newPass = bcrypt.hashSync(pass, salt);
    return newPass;
}

//if found return true;
const getCheckEmail = async (email) => {
    const project = await db.User.findOne({ where: { email } });
    if (project === null) {
        return false;
    }
    return project;
}



const register = async ({ email, password, username, groupID = 3 }) => {
    const newPass = hashPass(password);
    await db.User.create({ email: email, password: newPass, username: username, groupID });
}

const getAllUsers = async () => {
    return await db.User.findAll();
}


const getPageUser = async (offset, limit) => {
    return await db.User.findAndCountAll({
        offset,
        limit,
        raw: true,
        include: db.Group,
        nested: true,
    });
}

const userDelete = async (id) => {
    return await db.User.destroy({
        where: {
            id
        }
    });
}

const getAllGroups = async () => {
    return await db.Group.findAll();
}

const userUpdate = async ({ email, username, id, groupID }) => {

    return await db.User.update({ email: email, username: username, groupID: groupID }, {
        where: {
            id: id
        }
    });
}

const userCreate = async ({ email, username, groupID, password }) => {

    await register({ email, username, groupID, password });
}

const getAllRoles = async () => {
    return await db.Role.findAll();
}


const rolesCreate = async (data) => {
    return await db.Role.bulkCreate(data);
}

const rolesDelete = async (id) => {
    return await db.Role.destroy({
        where: {
            id
        }
    });
}


module.exports = {
    register, getCheckEmail, getAllUsers, getPageUser, userDelete,
    getAllGroups, userUpdate, userCreate, rolesCreate, getAllRoles, rolesDelete
};