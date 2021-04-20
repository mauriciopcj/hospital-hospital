import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Main from './pages/Main';
import AddConsulta from './pages/Consulta/Adicionar';
import ListarConsulta from './pages/Consulta/Listar';
import EditarConsulta from './pages/Consulta/Editar';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Main} />
      <Route path="/consultas/index" component={ListarConsulta} />
      <Route path="/consultas/adicionar" exact component={AddConsulta} />
      <Route path="/consultas/editar/:id" exact component={EditarConsulta} />
    </BrowserRouter>
  )
}

export default Routes;