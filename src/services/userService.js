import axios from '../utils/webConfig';

const getAllUsers = () => {
    return axios.get('/users');
}

const getPageUser = (page, limit) => {
    return axios.post('/users',
        {
            params: {
                page: page,
                limit: limit,
            }
        }
    );

}

const userDelele = (id) => {
    return axios.delete('/users/delete',
        {
            params: { id }
        }
    );
}

const getAllGroup = () => {
    return axios.get('/groups');
}

const updateUser = (user) => {
    return axios.put('/users/update',
        {

            user

        }
    );
}

const createUser = (user) => {
    return axios.post('/users/create',
        {
            user
        }
    );
}

const getUser = ()=>{
    return axios.get('/get/user');
}

export { getAllUsers, getPageUser, userDelele, getAllGroup, updateUser,createUser,getUser };