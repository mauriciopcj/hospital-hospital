import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import {
  Table,
  Container,
  Button,
  Pagination
} from 'react-bootstrap';

import {
  MdEdit,
  MdSearch,
  MdAdd,
} from 'react-icons/md';

import { 
  Header,
} from '../../../components';

import api from '../../../services/api';

interface IReceitaProps {
  id: number;
  nome: string;
  descricao: string;
  consulta_id: number;
}

const ReceitaListar: React.FC = () => {

  const history = useHistory();

  const [consultas, setReceitas] = useState<IReceitaProps[]>();
  const [size, setSize] = useState(10);
  const [offset, setOffset] = useState(0);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    get_receitas();
  },[]);

  useEffect(() => {
    get_receitas();
  },[size, offset]);

  const get_receitas = () => {
    api.get(`/receitas?limit=${size}&offset=${offset}`).then(response => {
      const { receitas, count } = response.data;
      setReceitas(receitas);
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

  const items = [
    {
      href: "/",
      name: "Home",
      isActive: false,
    },
    {
      href: "/receitas/index",
      name: "Receitas",
      isActive: true,
    },
  ]

  return (
    <>
      <Header items={[...items]}/>

      <Container>
        <h3 className="mb-3">Receitas</h3> 

        <Table hover size="sm">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Receita</th>
              <th>Ações</th>
            </tr>
          </thead>
          
          <tbody>
            {consultas && consultas.map(r => {
              return (
                <tr key={"recipe_list_item_" + r.id}>
                  <td>{r.nome}</td>
                  <td>{r.descricao}</td>
                  <td>{r.consulta_id}</td>
                  <td style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="outline-dark" size="sm" onClick={() => history.push(`/receitas/editar/${r.id}`)}>
                      <MdEdit />
                    </Button>  
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>

        <div className="d-flex justify-content-end">
          <Pagination size="sm">
            {add_paginations(pages)}
          </Pagination>
        </div>
      </Container>
    </>
  );
}

export default ReceitaListar;