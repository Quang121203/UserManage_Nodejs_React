const userServices = require('../sevices/userSevices');

const getHome = async (req, res) => {
    const row = await userServices.getAllUser();
    console.log('Cookies: ', req.cookies);
    res.render('home.ejs', { result: row })
}

const postCreateUser = async (req, res) => {
    const { email, password, username } = req.body;
    await userServices.createUser(email, password, username);
    res.redirect("/");
}

const postDeleteUser = async (req, res) => {
    const id = req.params.id;
    await userServices.deleteUser(id);
    res.redirect("/");
}

const getUpdateUser = async (req, res) => {
    const id = req.params.id;
    const row = await userServices.getUser(id);
    if (row) {
        const { username, email } = row;
        return res.render('update.ejs', { id, username, email });
    }
    res.send('no found user');
}

const postUpdateUser = async (req, res) => {
    const { id, username, email } = req.body;
    console.log(id, username, email);
    await userServices.updateUser(id, username, email);
    res.redirect("/");
}

module.exports = { getHome, postCreateUser, postDeleteUser, getUpdateUser, postUpdateUser }