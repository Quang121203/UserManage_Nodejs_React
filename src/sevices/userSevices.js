const connection = require("../database/connection");
const db = require("../models/index.js");

const bcrypt = require("bcrypt");

const hashPass = (pass) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const newPass = bcrypt.hashSync(pass, salt);
    return newPass;
}

const createUser = async (email, password, username) => {
    const newPass = hashPass(password);
    await db.User.create({ email: email, password: newPass, username: username });
}

const getAllUser = async () => {
    const allUser = await db.User.findAll({
        raw: true,
    });
    return allUser;
}

const deleteUser = async (id) => {
    await db.User.destroy({
        where: {
            id: id
        }
    });
}

const getUser = async (id) => {
    let user = await db.User.findByPk(id);
    user = user.get({ plain: true });
    return user;
}

const updateUser = async (id, username, email) => {
    await db.User.update({ username,email }, {
        where: {
            id
        }
    });
}

module.exports = { createUser, getAllUser, deleteUser, getUser, updateUser };