import axios from '../utils/webConfig';

const createRoles=(data)=>{
    return axios.post('/roles/create', {data});
}

const getAllRoles=()=>{
    return axios.get('/roles' );
}

const deleteRoles=(id)=>{
    return axios.delete('/roles/delete',{
        params: { id }
    });
}

const getRolesWithGroup=(id)=>{
    return axios.get(`/roles-group/${id}`);
}

export {createRoles,getAllRoles,deleteRoles,getRolesWithGroup} ;