import { useState } from "react";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

import {registerService} from '../../services/loginService';

function Register() {
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    let navigate = useNavigate();

    const handleRegister = async () => {
        if (email !== '' && username !== '' && password !== '' && rePassword !== '' && password === rePassword) {
            const res = await registerService(email, username, password);
         
            if(res.data.EC === 0){
                toast.success(res.data.EM)
                navigate('/login');
            }
            else{
                toast.error(res.data.EM)
            }
            
        }
        else {
            toast.error('Please check your input again')
        }
    }



    return (
        <form className="container mx-auto my-5 col-12 col-sm-6 border border-dark">
            <div className="form-outline mb-4 my-3 ">
                <input type="email" id="form2Example1" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="form-label" htmlFor="form2Example1">Email</label>
            </div>

            <div className="form-outline mb-4">
                <input type="text" id="form2Example4" className="form-control" value={username} onChange={(e) => setUserName(e.target.value)} />
                <label className="form-label" htmlFor="form2Example4">Username</label>
            </div>

            <div className="form-outline mb-4">
                <input type="password" id="form2Example2" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label className="form-label" htmlFor="form2Example2">Password</label>
            </div>

            <div className="form-outline mb-4">
                <input type="password" id="form2Example3" className="form-control" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
                <label className="form-label" htmlFor="form2Example3">Re-Password</label>
            </div>

            <div className="d-flex flex-column align-items-center">
                <Link className="btn btn-primary btn-block mb-4 col-6" onClick={() => handleRegister()}>Sign up</Link>
                <div className="border-top border-dark col-10 d-flex justify-content-center">
                    <Link className="btn btn-success btn-block mb-4 col-7 my-3 " to='/login' >Back</Link>
                </div>
            </div>
        </form>
    );
}

export default Register;