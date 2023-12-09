const apiServices = require('../sevices/apiServices')
const { getGroupWithRoles } = require('../sevices/JWTServices')
const { createJWT } = require('../middleware/JWTAction')

const bcrypt = require('bcrypt');



const postRegister = async (req, res) => {
    try {
        const checkEmail = await apiServices.getCheckEmail(req.body.params.email);
        if (!checkEmail) {
            await apiServices.register(req.body.params);
            return res.status(200).json(
                {
                    EM: 'success register',
                    EC: 0,
                }
            );
        }
        return res.status(200).json(
            {
                EM: 'email has user',
                EC: 1,
            }
        );
    }
    catch (err) {
        return res.status(400).json(
            {
                EM: 'error from back-end',
                EC: 1,

            }
        );
    }

}

const postLogin = async (req, res) => {
    try {
        const user = await apiServices.getCheckEmail(req.body.params.email);

        if (user) {
            const checkPass = bcrypt.compareSync(req.body.params.password, user.password);
            if (checkPass) {
                const roles = await getGroupWithRoles(user.groupID);
                const payload = {
                    email: user.email,
                    groupWithRole: roles,
                    expressIn: "1h"
                };
                const token = createJWT(payload);

                //set cookie
                res.cookie('jwt', token, { httpOnly: true }, {
                    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
                });

                return res.status(200).json(
                    {
                        EM: 'success login',
                        EC: 0,
                        DT: {
                            email: user.email,
                            token: token,
                        }
                    }
                );
            }

        }
        return res.status(200).json(
            {
                EM: "account don't exist",
                EC: 1,
            }
        );
    }
    catch (err) {
        return res.status(400).json(
            {
                EM: 'error from back-end',
                EC: 1,

            }
        );
    }

}

const getAllUsers = async (req, res) => {
    try {
        const users = await apiServices.getAllUsers();

        return res.status(200).json(
            {
                EM: 'success get User',
                EC: 0,
                DT: users
            }
        );
    } catch (err) {
        return res.status(500).json(
            {
                EM: 'error back-end',
                EC: 1,
                DT: ""
            }
        );
    }
}

const postPageUsers = async (req, res) => {
    try {
        const page = (req.body.params.page);
        const limit = (req.body.params.limit);
        const offset = (+page - 1) * (+limit);
        const { count, rows } = await apiServices.getPageUser(offset, limit);

        return res.status(200).json({
            EM: 'success',
            EC: 0,
            DT: {
                count: count,
                rows: rows
            }
        })
    }
    catch (e) {
        return res.status(500).json(
            {
                EM: 'error back-end',
                EC: 1,
                DT: ""
            }
        );
    }

}

const deleteUser = async (req, res) => {
    try {
        const id = req.query.id;
        await apiServices.userDelete(id);
        return res.status(200).json({
            EM: 'success delete',
            EC: 0,
            DT: ""
        })
    }
    catch (e) {
        return res.status(500).json(
            {
                EM: 'error back-end',
                EC: 1,
                DT: ""
            }
        );
    }

}

const getAllGroups = async (req, res) => {
    try {
        const groups = await apiServices.getAllGroups();
        return res.status(200).json({
            EM: 'success ',
            EC: 0,
            DT: groups
        })
    }
    catch (e) {
        return res.status(500).json(
            {
                EM: 'error back-end',
                EC: 1,
                DT: ""
            }
        );
    }
}

const putUpdateUser = async (req, res) => {
    try {
        await apiServices.userUpdate(req.body.user);
        return res.status(200).json({
            EM: 'success Update',
            EC: 0,
            DT: ""
        })
    }
    catch (e) {
        return res.status(500).json(
            {
                EM: 'error back-end',
                EC: 1,
                DT: ""
            }
        );
    }
}

const postCreateUser = async (req, res) => {
    try {
        const checkEmail = await apiServices.getCheckEmail(req.body.user.email);

        if (!checkEmail) {
            await apiServices.userCreate(req.body.user);
            return res.status(200).json({
                EM: 'success Create',
                EC: 0,
                DT: ""
            })

        } else {
            return res.status(200).json(
                {
                    EM: 'email have exists',
                    EC: 1
                }
            );
        }
    }
    catch (e) {
        return res.status(500).json(
            {
                EM: 'error back-end',
                EC: 1,
                DT: ""
            }
        );
    }
}

const getUser = async (req, res) => {
    try {
        if (req.user) {
            return res.status(200).json({
                EM: 'get User success',
                EC: 0,
                DT: {
                    user: req.user,
                    token: req.token,
                }
            })
        }
        else {

            return res.status(200).json({
                EC: 1,
                EM: "Login Error",
            })

        }
    } catch (err) {
        return res.status(500).json(
            {
                EM: 'error back-end',
                EC: 1,
                DT: ""
            }
        );
    }

}

const postCreateRole = async (req, res) => {
    try {
        const roles = await apiServices.getAllRoles();

        const results = req.body.data.filter(({ url: url1 }) => !roles.some(({ url: url2 }) => url1 === url2));

        if (results.length > 0) {
            await apiServices.rolesCreate(req.body.data);
        }
        else {
            return res.status(200).json({
                EM: 'All roles is exits',
                EC: 0,
                DT: '',
            });
        }

        return res.status(200).json({
            EM: `create success ${results.length} roles`,
            EC: 0,
            DT: roles,
        });
    } catch (err) {
        return res.status(500).json({
            EM: 'error from back-end',
            EC: 1,
            DT: ''
        });
    }
}

const getAllRoles = async (req, res) => {
    try {
        const roles = await apiServices.getAllRoles();
        return res.status(200).json({
            EM: '',
            EC: 0,
            DT: roles,
        });
    } catch (err) {
        return res.status(500).json({
            EM: 'error from back-end',
            EC: 1,
            DT: '',
        });
    }
}

const deleteRole = async (req, res) => {
    try {
        const id = req.query.id;
        await apiServices.rolesDelete(id);
        return res.status(200).json({
            EM: 'delete success',
            EC: 0,
            DT: '',
        });
    } catch (err) {
        return res.status(500).json({
            EM: 'error from back-end',
            EC: 1,
            DT: '',
        });
    }
}

const getRoleWithGroup = async (req, res) => {
    //const data=await getGroupWithRoles(req.params);
    try {
        const id=req.params.id;
        const data=await getGroupWithRoles(id);
        return res.status(200).json({
            EM: 'get success',
            EC: 0,
            DT: data,
        });
    } catch (err) {
        return res.status(500).json({
            EM: 'error from back-end',
            EC: 1,
            DT: '',
        });
    }
}

module.exports = {
    postRegister, postLogin, getAllUsers, postPageUsers, deleteUser,
    getAllGroups, putUpdateUser, postCreateUser, getUser, postCreateRole,
    getAllRoles, deleteRole, getRoleWithGroup
}

