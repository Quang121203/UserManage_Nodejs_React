import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';

import { createRoles } from '../../services/roleService'
import TableRoles from './TableRoles';

function Role() {
    const dataDefault = { role: '', description: '', isValid: true };
    const [input, setInput] = useState([dataDefault]);

    const childRef = useRef();

    const onChange = (e, index, field) => {
        const inputClone = [...input];
        inputClone[index][field] = e.target.value;
        setInput(inputClone);
    }

    const onClickAddInput = () => {
        const inputClone = [...input];
        inputClone.push(dataDefault);
        setInput(inputClone);
    }

    const onClickDeleteInput = () => {
        const inputClone = [...input];
        inputClone.pop();
        setInput(inputClone);
    }

    const checkValid = () => {
        const inputClone = [...input];
        let check = true;
        inputClone.map((item, index) => {
            if (!item.role.trim()) {
                item.isValid = false;
                check = false;
            }
            else {
                item.isValid = true;
            }
            return item;
        })

        if (!check) {
            toast.warning('Please fill the field Role')
        }

        setInput(inputClone);


        return check;
    }

    const dataSave = () => {
        const inputClone = [...input];
        const data = [];
        inputClone.map(item => {
            data.push({ url: item.role, description: item.description });
            return null;
        })
        return data;
    }

    const onClickAdd = async () => {
        const check = checkValid()
        if (check) {
            const data = dataSave();
            const result = await createRoles(data);
            if (result.data.EC === 0) {
                toast.success(result.data.EM);
                console.log(childRef.current);
                await childRef.current.getRoles();
                setInput([dataDefault]);
            }
            
        }
    }

    return (
        <div className='container'>
            <Form className='  py-1 '>
                <h1 className=' my-4'>Add Roles</h1>
                {input.map((item, index) => {
                    return (
                        <div className='d-flex my-4' key={index} id={index}>
                            <Form.Group className="col-4 " controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Enter Role" value={item['role']} onChange={(e) => onChange(e, index, "role")} className={item.isValid ? '' : 'is-invalid'} />
                            </Form.Group>

                            <Form.Group className="col-4 mx-4" controlId="formBasicPassword">
                                <Form.Control type="text" placeholder="Enter Description" value={item['description']} onChange={(e) => onChange(e, index, "description")} />
                            </Form.Group>
                            {index === input.length - 1 &&
                                (
                                    <>
                                        <Button variant="primary" className='col-1 me-2' onClick={() => onClickAddInput()}>
                                            Add
                                        </Button>
                                        <Button variant="warning" className='col-1 ' onClick={() => onClickDeleteInput()}>
                                            Delete
                                        </Button>
                                    </>
                                )
                            }


                        </div>
                    );
                })}


                <Button variant="success" onClick={() => onClickAdd()}>
                    Submit
                </Button>
            </Form>

            <TableRoles ref={childRef}/>
        </div>
    );
}



export default Role;