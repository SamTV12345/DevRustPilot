import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

export function NavBar() {
  const navigate = useNavigate();
  return (
    <Navbar bg="light" expand="lg" className="d-flex">
      <Container>
        <Navbar.Brand onClick={() => navigate('/home')}>
          Electron-Utils
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/utf16')}>UTF8 To 16</Nav.Link>
            <Nav.Link onClick={() => navigate('/wsl')}>WSL</Nav.Link>
            <NavDropdown title="Generate" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate('/generate/person')}>Person</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate('/generate/ids')}>IDs</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/jwt')}>JWT</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Docker" id="docker-dropdown">
              <NavDropdown.Item onClick={() => navigate('/docker/images')}>Images</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/docker/containers')}>Containers</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => navigate('/nativeui')}>Linux Native GUI</Nav.Link>
            <Nav.Link onClick={()=>navigate('/docker')}></Nav.Link>
            <Nav.Link onClick={() => navigate('/settings')}>Einstellungen</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
