import React from 'react';

import {
  Breadcrumb,
  Container,
  Nav,
  Navbar,
} from 'react-bootstrap';

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

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>

              <Nav.Link href="/consultas/index">Consultas</Nav.Link>

              <Nav.Link href="/receitas/index">Receitas</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Breadcrumb>
          {items && items.map(item => (
            <Breadcrumb.Item key={item.name} href={item.href} active={item.isActive}>{item.name}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </Container>


    </div>
  );
}

export default Header;