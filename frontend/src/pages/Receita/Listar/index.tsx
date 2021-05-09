import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import {
  Table,
  Container,
  Button,
} from 'react-bootstrap';

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

  useEffect(() => {
    api.get('/receitas').then(response => {
      setReceitas(response.data.receitas);
    }).catch(error => {
      console.log(error);
    })
  },[]);

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

      <Container className="mt-5">
        <Table bordered hover>
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
                  <td>
                    <Button variant="outline-dark" onClick={() => history.push(`/receitas/editar/${r.id}`)}>
                      Editar
                    </Button>  
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default ReceitaListar;