import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Main from './pages/Main';
import AddConsulta from './pages/Consulta/Adicionar';
import ListarConsulta from './pages/Consulta/Listar';
import EditarConsulta from './pages/Consulta/Editar';
import ListarReceita from './pages/Receita/Listar';
import AddReceita from './pages/Receita/Adicionar';
import EditarReceita from './pages/Receita/Editar';
import DetalheConsulta from './pages/Consulta/Detalhe';
import AddProntuario from './pages/Prontuario/Adicionar';
import ListarProntuario from './pages/Prontuario/Listar';
import EditarProntuario from './pages/Prontuario/Editar';
import Login from './pages/Login';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/consultas/index" component={ListarConsulta} />
      <Route path="/consultas/adicionar" exact component={AddConsulta} />
      <Route path="/consultas/editar/:id" exact component={EditarConsulta} />
      <Route path="/consultas/detalhe/:id" exact component={DetalheConsulta} />
      <Route path="/receitas/index" component={ListarReceita} />
      <Route path="/receitas/adicionar/:id" exact component={AddReceita} />
      <Route path="/receitas/editar/:id" exact component={EditarReceita} />
      <Route path="/prontuarios/index" exact component={ListarProntuario} />
      <Route path="/prontuarios/adicionar" exact component={AddProntuario} />
      <Route path="/prontuarios/editar/:id" exact component={EditarProntuario} />
    </BrowserRouter>
  )
}

export default Routes;