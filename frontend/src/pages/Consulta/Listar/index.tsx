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

  return (
    <>
      <Header />

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
                  <td>{c.medico}</td>
                  <td>{c.paciente}</td>
                  <td>
                    <Button variant="outline-dark" onClick={() => history.push(`/consultas/editar/${c.id}`)}>
                      Editar
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