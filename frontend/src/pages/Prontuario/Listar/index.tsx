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
import UserService from '../../../services/UserService';

interface ICirurgiaProps {
  id: number;
  nome: string;
  descricao: string;
  data_entrada: string;
  data_saida: string;
}

interface IProntuarioProps {
  id: number;
  paciente: string;
  doencas: string;
  alergias: string;
  medicamentos: string;
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

interface UsuarioProps {
  id: string;
  username: string;
}

const ProntuarioListar: React.FC = () => {

  const history = useHistory();

  const [prontuarios, setProntuarios] = useState<IProntuarioProps[]>();
  const [size, setSize] = useState(10);
  const [offset, setOffset] = useState(0);
  const [pages, setPages] = useState(1);
  const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);

  useEffect(() => {
    get_prontuarios();
    get_users();
  },[]);

  useEffect(() => {
    get_prontuarios();
  },[size, offset]);

  const get_users = async () => {
    const result = await UserService.getAll();
    setUsuarios(result);
  }

  const get_prontuarios = () => {
    api.get(`/prontuarios?limit=${size}&offset=${offset}`).then(response => {
      const { prontuarios, count } = response.data;
      setProntuarios(prontuarios);
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
    history.push("/prontuarios/adicionar");
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
      href: "/prontuarios/index",
      name: "Prontuários",
      isActive: true,
    },    
  ]

  return (
    <div>
      <Header items={[...items]}/>

      <Container>
        
        <h3 className="mb-3">Prontuários</h3>

        <Table hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Paciente</th>
              <th>Doenças</th>
              <th>Medicamentos</th>
              <th>Alergias</th>
              <th style={{ display: "flex", justifyContent: "flex-end" }}>Ações</th>
            </tr>
          </thead>
          
          <tbody>
            {prontuarios && prontuarios.map(p => {
              return (
                <tr key={"pront_list_item_" + p.id}>
                  <td>{p.id}</td>
                  <td>{p.paciente}</td>
                  <td>{p.doencas}</td>
                  <td>{p.medicamentos}</td>
                  <td>{p.alergias}</td>
                  <td style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button 
                      style={{ marginRight: 10 }}
                      variant="outline-dark" 
                      size="sm"
                      onClick={() => history.push(`/prontuarios/editar/${p.id}`)}
                    >
                      <MdEdit />
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

        <Button variant="dark" onClick={handleAdicionar} className="mb-3">
          Adicionar
        </Button>    
      </Container>
    </div>
  );
}

export default ProntuarioListar;