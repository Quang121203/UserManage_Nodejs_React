const db = require("../models/index.js");


const getGroupWithRoles = async (groupID) => {
    const roles = await db.Group.findAll({
        include:db.Role,
        where:{
            id:groupID
        },
        raw:true,
        nested:true, 
        nest:true
    })
    
    
    return roles?roles:[];
};

module.exports = {getGroupWithRoles}