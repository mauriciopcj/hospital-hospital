import { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Alert
} from "react-bootstrap"

import { Link, useHistory } from "react-router-dom";
import AuthService from '../../services/AuthService';

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  let history = useHistory();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();

      AuthService.login({username, password}).then(res => {
        history.push("/")
      }).catch(error => {
        setMessage("Usuário ou senha inválidos");
        setShow(true);
        history.push("/login");
      });
    }
    setValidated(true);
  };

  const onChangeUsername = (event: any) => {
    setUsername(event.target.value);
  }

  const onChangePassword = (event: any) => {
    setPassword(event.target.value);
  }

  return (
    <div>
      <Container 
        className="d-flex flex-column justify-content-center align-items-center" 
        style={{height: "100vh"}}
      >
        <Card className="w-100">
          <Card.Header>
            Login
          </Card.Header>

          <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-3">

            {show && (
              <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                {message}
              </Alert>
            )}
            <Form.Group controlId="formLoginUsername">
              <Form.Label>Usuário</Form.Label>
              <Form.Control required onChange={onChangeUsername} type="text" placeholder="Digite o nome de usuário" />
              <Form.Control.Feedback type="invalid">
                Por favor insira o nome de usuário.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formLoginPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control required onChange={onChangePassword} type="text" placeholder="Digite a senha" />
              <Form.Control.Feedback type="invalid">
                Por favor insira a senha.
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit">
              Enviar
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
