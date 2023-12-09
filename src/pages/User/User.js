import Table from 'react-bootstrap/Table';
import { useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";

import { getPageUser } from '../../services/userService'
import { ModalDelete, ModalUpdate,ModalCreate } from '../../component/Modals';

function User() {

    const [listUser, setListUser] = useState([]);
    const [userCurrent, setUserCurrent] = useState({});

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 3;

    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showCreate, setShowCreate] = useState(false);

    

    let navigate = useNavigate();

    

    useEffect(() => {
        getUser(page, limit);
    }, [page,navigate]);

    const getUser = async (page, limit) => {
        const res = await getPageUser(page, limit);
        if (+res.data.EC === 0) {
            setTotalPages(Math.ceil(+res.data.DT.count / limit));
            setListUser(res.data.DT.rows);
        }
    }
   
    const handlePageClick = (e) => {
        console.log(e.selected);
        setPage(+e.selected + 1);
    }

    const handleShowDelete = (user) => {
        setUserCurrent(user);
        setShowDelete(true);
    }

    const handleShowUpdate = (user) => {
        setUserCurrent(user);
        setShowUpdate(true);
    }

    const handleShowCreate = (user) => {
        setShowCreate(true);
    }


    const handleClose = async () => {
        setUserCurrent({});
        setShowDelete(false);
        setShowUpdate(false);
        setShowCreate(false);
        await getUser(page, limit);
    }



    return (
        <div className='container'>
            <button className="btn btn-success mt-4" onClick={()=>handleShowCreate()}>Create</button>

            <Table striped bordered hover className='my-4'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Group</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser.length > 0 && listUser.map(user =>
                        <tr key={'key ' + user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.groupID ? user["Group.name"] : ''}</td>
                            <td>
                                <button className="btn btn-danger mx-2" onClick={() => handleShowDelete(user)}>Delete</button>
                                <button className="btn btn-primary" onClick={() => handleShowUpdate(user)}>Update</button>
                            </td>
                        </tr>
                    )
                    }

                </tbody>
            </Table>

            <div className='d-flex justify-content-center'>
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={totalPages}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>

            <ModalDelete user={userCurrent} show={showDelete} handleClose={handleClose} />
            <ModalUpdate user={userCurrent} show={showUpdate} handleClose={handleClose} />
            <ModalCreate show={showCreate} handleClose={handleClose} />

        </div>
    );
}

export default User;