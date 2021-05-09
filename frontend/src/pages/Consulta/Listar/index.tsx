import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import moment from 'moment';

import {
  Table,
  Container,
  Button,
} from 'react-bootstrap';

import { 
  Header,
} from '../../../components';

import api from '../../../services/api';

interface IConsultaProps {
  id: number;
  local: string;
  data: string;
  medico: number;
  paciente: number;
}

const opcoes = [
  {
    label: "Usuário 1",
    value: 1
  },
  {
    label: "Usuário 2",
    value: 2
  },
]

const ConsultaListar: React.FC = () => {

  const history = useHistory();

  const [consultas, setConsultas] = useState<IConsultaProps[]>();

  useEffect(() => {
    api.get('/consultas').then(response => {
      setConsultas(response.data.consultas);
    }).catch(error => {
      console.log(error);
    })
  },[]);

  const handleAdicionar = () => {
    history.push("/consultas/adicionar");
  }

  const formateDate = (date: string) => {
    return moment(date).format('DD-MM-YYYY HH:MM:SS');
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
      isActive: true,
    },
  ]

  return (
    <>
      <Header items={[...items]}/>

      <Container className="mt-5">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Local</th>
              <th>Data</th>
              <th>Medico</th>
              <th>Paciente</th>
              <th>Ações</th>
            </tr>
          </thead>
          
          <tbody>
            {consultas && consultas.map(c => {
              return (
                <tr key={"consult_list_item_" + c.id}>
                  <td>{c.local}</td>
                  <td>{formateDate(c.data)}</td>
                  <td>{opcoes[c.medico-1].label}</td>
                  <td>{opcoes[c.paciente-1].label}</td>
                  <td >
                    <Button 
                      style={{ marginRight: 10 }}
                      variant="outline-dark" 
                      onClick={() => history.push(`/consultas/editar/${c.id}`)}
                    >
                      Editar
                    </Button> 

                    <Button 
                      style={{ marginRight: 10 }}
                      variant="outline-dark" 
                      onClick={() => history.push(`/consultas/detalhe/${c.id}`)}
                    >
                      Detalhes
                    </Button>

                    <Button 
                      variant="outline-dark" 
                      onClick={() => history.push(`/receitas/adicionar/${c.id}`)}
                    >
                      Add Receita
                    </Button>  
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>

        <Button variant="dark" onClick={handleAdicionar}>
          Adicionar
        </Button>
      </Container>
    </>
  );
}

export default ConsultaListar;