import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useHistory } from 'react-router';

import {
  Button,
  Form,
  Container,
} from 'react-bootstrap';

import Header from '../../../components/Header';

import api from '../../../services/api';


interface IReceitaProps {
  nome: string;
  descricao: string;
  consulta_id: number;
}

const receitaDefault = {
  nome: "",
  descricao: "",
  consulta_id: 0,
}

type TParams = { id: string };

const AdicionarReceita: React.FC<RouteComponentProps<TParams>> = ({ match }) => {

  const { id } = match.params;

  const history = useHistory();

  const [validated, setValidated] = useState(false);
  const [receita, setReceita] = useState<IReceitaProps>(receitaDefault);

  useEffect(() => {
    setReceita(receitaDefault);
    setReceita({
      ...receita,
      consulta_id: parseInt(id)
    });
  }, []);

  const handleCancel = () => {
    history.goBack();
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
  
      api.post('/receitas', receita).then(response => {
        history.goBack();
      }).catch(error => {
        console.log(error);
      })
    }
    setValidated(true);
  }

  const onChangeNome = (event: any) => {
    setReceita({
      ...receita,
      nome: event.target.value
    });
  }

  const onChangeDescricao = (event: any) => {
    setReceita({
      ...receita,
      descricao: event.target.value
    });
  }

  const items = [
    {
      href: "/",
      name: "Home",
      isActive: false,
    },
    {
      href: "/consultas/index",
      name: "Consultas",
      isActive: false,
    },
    {
      href: "/receitas/adicionar",
      name: "Adicionar Receita",
      isActive: true,
    },
  ]

  return (
    <div>
      <Header items={[...items]}/>

      <Container className="mt-5">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formAddReceita">
            <Form.Label>Nome</Form.Label>
            <Form.Control required onChange={onChangeNome} type="text" placeholder="Digite o nome do medicamento" />
            <Form.Control.Feedback type="invalid">
              Por favor insira o nome.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formAddConsultaData">
            <Form.Label>Descrição</Form.Label>
            <Form.Control required type="text" onChange={onChangeDescricao} placeholder="Digite a descrição"/>
            <Form.Control.Feedback type="invalid">
              Por favor insira uma descrição.
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="outline-dark" className="mr-3" onClick={handleCancel}>
            Cancelar
          </Button>

          <Button variant="dark" type="submit">
            Salvar
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AdicionarReceita;