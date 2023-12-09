import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserContext } from "../../context/userContext";
import { useContext } from 'react';
import { NavLink } from "react-router-dom";

function Header() {
    const { user } = useContext(UserContext);
    return (
        <>
            {
                user.auth ? (
                    <>
                        <Navbar expand="lg" className="bg-body-tertiary" >
                            <Container>
                                <Navbar.Brand href="/">Manager User</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        <NavLink to="/"  className="nav-link">User</NavLink>
                                        <NavLink to="/role"  className="nav-link">Role</NavLink>
                                        <NavLink to="/group-role"  className="nav-link">Group-Role</NavLink>
                                    </Nav>
                                    <Nav >
                                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                                            <div className="dropdown-item" >Log in</div>
                                            <div className="dropdown-item">Log out</div>
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar >
                    </>
                )
                    :
                    (<></>)
            }
        </>

    );
}

export default Header;