import React from 'react';
import { useHistory } from 'react-router';

import {
  Container,
  Card,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

import Header from '../../components/Header';

const Main: React.FC = () => {

  const history = useHistory();

  const acessar_consultas = () => {
    history.push("/consultas/index");
  }

  const acessar_receitas = () => {
    history.push("/receitas/index");
  }

  const acessar_prontuarios = () => {
    history.push("/prontuarios/index");
  }

  const items = [
    {
      href: "/",
      name: "Home",
      isActive: true,
    },
  ]

  return (
    <div style={{ background: "#f3f3f3", minHeight: "100vh" }}>
      <Header items={[...items]}/>

      <Container>
        <Row>
          <Col>
            <Card style={{ marginBottom: 10 }}>
              <Card.Body className="d-flex flex-column align-items-center">

                <img className="my-5" src="prontuarios.png" style={{ maxHeight: 200 }}/>
                
                <h1>Prontuários</h1>  

                <Button variant="dark" className="mt-3" onClick={acessar_prontuarios}>
                  Acessar
                </Button>                     
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ marginBottom: 10 }}>
              <Card.Body className="d-flex flex-column align-items-center">

                <img className="my-5" src="consultas.png" style={{ maxHeight: 200 }}/>

                <h1>Consultas</h1> 

                <Button variant="dark" className="mt-3" onClick={acessar_consultas}>
                  Acessar
                </Button>                      
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ marginBottom: 10 }}>
              <Card.Body className="d-flex flex-column align-items-center">

                <img className="my-5" src="receitas.png" style={{ maxHeight: 200 }}/>

                <h1>Receitas</h1> 

                <Button variant="dark" className="mt-3" onClick={acessar_receitas}>
                  Acessar
                </Button>                     
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>    
    </div>
  );

}

const styles = {
  container: {
    maxWidth: 900,
    margin: "0 auto"
  }
}

export default Main;