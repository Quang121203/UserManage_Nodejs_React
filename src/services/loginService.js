import axios from '../utils/webConfig';

const registerService = async ( email,username, password,) => {
    return await axios.post('/register', {
        params: {
            username,
            password,
            email
        }
    })
}

const loginService = async ( email, password,) => {
    return await axios.post('/login', {
        params: {
            password:password,
            email:email
        }
    })
}


export {registerService,loginService};