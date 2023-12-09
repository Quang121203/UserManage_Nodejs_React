import { Link,useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import { toast } from 'react-toastify';


import { loginService } from '../../services/loginService';
import { UserContext } from "../../context/userContext";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login} = useContext(UserContext);


    let navigate = useNavigate();

    const handleLogin = async () => {
        const res = await loginService(email, password);
        if (res.data.EC === 0) {
            toast.success(res.data.EM)
            login(res.data.DT);     
            navigate('/');
        }
        else {
            toast.error(res.data.EM)
        }
    }
    return (
        <form className="container mx-auto my-5 col-12 col-sm-6 border border-dark">
            <div className="form-outline mb-4 my-3 ">
                <input type="email" id="form2Example1" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="form-label" htmlFor="form2Example1">Email</label>
            </div>

            <div className="form-outline mb-4">
                <input type="password" id="form2Example2" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label className="form-label" htmlFor="form2Example2">Password</label>
            </div>
            <div className="d-flex flex-column align-items-center">
                <button type="button" className="btn btn-primary btn-block mb-4 col-6" onClick={() => handleLogin()}>Sign in</button>
                <div className="border-top border-dark col-10 d-flex justify-content-center">
                    <Link to='/register' className="btn btn-success btn-block mb-4 col-7 my-3 ">Sign up</Link>
                </div>
            </div>
        </form>
    );
}

export default Login;