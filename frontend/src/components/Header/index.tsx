import React, { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';

import {
  Breadcrumb,
  Container,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { useHistory } from 'react-router';

interface ItemsProps {
  items: ItemProps[];
}

interface ItemProps {
  href: string;
  name: string;
  isActive: boolean;
}


const Header: React.FC<ItemsProps> = (props) => {
  const items = props.items;
  const [username, setUsername] = useState("");
  const [authority, setAuthority] = useState("");

  const history = useHistory();

  useEffect(() => {
    const { username: user, authority: auth} = AuthService.getUser();
    if (user && auth) {
      setUsername(user);
      setAuthority(auth);
    }
    if (!user && auth !== "ADMIN") {
      history.push("/login");
    }
  }, []);

  const logout = () => {
    AuthService.logout();
    history.push("/login");
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>

              <Nav.Link href="/prontuarios/index">Prontuários</Nav.Link>

              <Nav.Link href="/consultas/index">Consultas</Nav.Link>

              <Nav.Link href="/receitas/index">Receitas</Nav.Link>

              {!username && <Nav.Link href="/login">Login</Nav.Link>}
              {username && <Nav.Link onClick={logout}>Logout</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Breadcrumb listProps={{ style: { paddingTop: 5, paddingBottom: 5 } }}>
          {items && items.map(item => (
            <Breadcrumb.Item key={item.name} href={item.href} active={item.isActive}>{item.name}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </Container>


    </div>
  );
}

export default Header;