import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';


import { getAllRoles, deleteRoles } from '../../services/roleService';

const TableRoles = forwardRef((props, ref) => {

    const [listRoles, setListRoles] = useState([]);

    useEffect(() => {
        getRoles();
    }, []);

    useImperativeHandle(ref, () => ({
        getRoles
    }));

    const getRoles = async () => {
        const result = await getAllRoles();
        if (result && result.data && result.data.EC === 0) {
            setListRoles(result.data.DT);
        }
    }

    const onClickDelete = async (id) => {
        const result = await deleteRoles(id);
        if (result && result.data && result.data.EC === 0) {
            toast.success(result.data.EM);
            await getRoles();
        }
    }

    return (
        <div className="mt-5">
            <h1>Display Roles:</h1>

            <Table striped bordered hover variant="white" className='my-5'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listRoles.length > 0 && listRoles.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.url}</td>
                                <td>{item.description}</td>
                                <td>
                                    <Button variant="warning" onClick={() => onClickDelete(item.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
        </div>
    )
}
)

export default TableRoles;