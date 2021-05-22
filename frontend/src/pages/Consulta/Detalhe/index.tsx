import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import moment from 'moment';

import {
  Container,
  Card,
  Table,
  Button,
  Row,
  Col,
} from 'react-bootstrap';


import api from '../../../services/api';
import { Header } from '../../../components';

interface IReceitaProps{
  id: number;
  nome: string;
  descricao: string;
}

interface IConsultaProps {
  local: string;
  data: string;
  medico: string;
  paciente: string;
  observacoes: string;
  receitas: IReceitaProps[];
}

type TParams = { id: string };

const DetalheConsulta: React.FC<RouteComponentProps<TParams>> = ({ match }) => {

  const { id } = match.params;

  const history = useHistory();

  const [consulta, setConsulta] = useState<IConsultaProps>();

  useEffect(() => {
    api.get(`/consultas/${id}`).then(response => {
      console.log(response.data);

      const { data, local, medico, paciente, observacoes, receitas } = response.data.consulta;

      setConsulta({ data: formateDate(data), local, medico, paciente, observacoes, receitas });
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const formateDate = (date: string) => {
    return moment(date).format('YYYY-MM-DD');
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
      href: "/consultas/detalhe",
      name: "Detalhe",
      isActive: true,
    },
  ]

  return (
    <div>
      <Header items={[...items]}/>

      <Container>
        <br/>
        <h2>Detalhes da Consulta</h2><br/>

        <Card style={{ marginBottom: 10 }}>
          <Card.Body>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Local</th>
                  <th>Observações</th>
                </tr>
              </thead>
              
              <tbody>
                <tr>
                  <td>{consulta?.data}</td>
                  <td>{consulta?.local}</td>
                  <td>{consulta?.observacoes}</td>
                </tr>
              </tbody>
            </Table>           
          </Card.Body>
        </Card>

        <h2>Receitas</h2><br/>
        <Row>
          {consulta && consulta.receitas.map((obj, index) => (
            <Col key={index}>
              <Card  style={{ marginBottom: 10 }}>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{obj.nome}</Card.Title>

                  <Card.Text>
                    {obj.descricao}
                  </Card.Text> 
                  
                  <Button variant="outline-dark" onClick={() => history.push(`/receitas/editar/${obj.id}`)}>
                    Editar
                  </Button> 
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

      </Container>

    </div>
  );

}

export default DetalheConsulta;