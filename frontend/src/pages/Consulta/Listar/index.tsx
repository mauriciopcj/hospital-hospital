import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import moment from 'moment';

import {
  MdEdit,
  MdSearch,
  MdAdd,
} from 'react-icons/md';

import {
  Table,
  Container,
  Button,
  Pagination
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
  const [size, setSize] = useState(10);
  const [offset, setOffset] = useState(0);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    get_consultas();
  },[]);

  useEffect(() => {
    get_consultas();
  },[size, offset]);

  const get_consultas = () => {
    api.get(`/consultas?limit=${size}&offset=${offset}`).then(response => {
      const { consultas, count } = response.data;

      setConsultas(consultas);
      setPages((count % size > 0) ? Math.floor(count / size) + 1 : count / size);
    }).catch(error => {
      console.log(error);
    })
  }

  const add_paginations = (pages: number) => {
    let items = [];
    for (let number = 0; number < pages; number++) {
      items.push(
        <Pagination.Item key={number} onClick={() => setOffset(number * size)} active={offset === number * size}>
          {number + 1}
        </Pagination.Item>,
      );
    }
    return items;
  }

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

      <Container>
        <h3 className="mb-3">Consultas</h3>        

        <Table bordered hover size="sm">
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
                      size="sm"
                      onClick={() => history.push(`/consultas/editar/${c.id}`)}
                    >
                      <MdEdit />
                    </Button> 

                    <Button 
                      style={{ marginRight: 10 }}
                      variant="outline-dark" 
                      size="sm"
                      onClick={() => history.push(`/consultas/detalhe/${c.id}`)}
                    >
                      <MdSearch />
                    </Button>

                    <Button 
                      variant="outline-dark" 
                      size="sm"
                      onClick={() => history.push(`/receitas/adicionar/${c.id}`)}
                    >
                      <MdAdd />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>

        <div className="d-flex justify-content-end">
          <Pagination  size="sm">
            {add_paginations(pages)}
          </Pagination>
        </div>  

        <Button className="mb-3" variant="dark" onClick={handleAdicionar}>
          Adicionar
        </Button>     
      </Container>
    </>
  );
}

export default ConsultaListar;