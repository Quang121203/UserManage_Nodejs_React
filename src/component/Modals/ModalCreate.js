import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';


import { getAllGroup, createUser } from '../../services/userService'




function ModalCreate({ user, show, handleClose }) {
    const [listGroup, setListGroup] = useState([]);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [group, setGroup] = useState(1);
    const [password, setPassword] = useState("");

    useEffect(() => {
       
        getGroup();
    }, []);

    const getGroup = async () => {
        const res = await getAllGroup();
        setListGroup(res.data.DT);
    }

    const handleCreate = async () => {
        const res = await createUser({ email, username, groupID: group, password });
        if (+res.data.EC === 0) {
            toast.success(res.data.EM);
            handleClose();
        }
        else{
            toast.error(res.data.EM);
        }
       
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
                            <input type="text" className="form-control" id="exampleInputUsername1" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">password</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div class="mb-3">
                            <label htmlFor="disabledSelect" className="form-label">Group</label>
                            <select id="disabledSelect" className="form-select" onChange={(e) => setGroup(e.target.value)} value={group}>
                                {listGroup.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreate
    ;