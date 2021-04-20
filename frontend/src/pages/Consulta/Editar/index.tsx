import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import moment from 'moment';
import {
  RouteComponentProps
} from 'react-router-dom';

import {
  Button,
  Form,
  Container,
} from 'react-bootstrap';

import Header from '../../../components/Header';

import api from '../../../services/api';

const opcoes = [
  {
    label: "Fulano",
    value: 1
  },
  {
    label: "Cicrano",
    value: 2
  },
]

interface IConsultaProps {
  local: string;
  data: string;
  medico: string;
  paciente: string;
}

const consultaDefault = {
  local: '',
  data: '',
  medico: '',
  paciente: ''
}

type TParams = { id: string };

function EditarConsulta({ match }: RouteComponentProps<TParams>) {

  const { id } = match.params;

  const history = useHistory();

  const [validated, setValidated] = useState(false);
  const [consulta, setConsulta] = useState<IConsultaProps>(consultaDefault);

  useEffect(() => {
    api.get(`/consultas/${id}`).then(response => {
      const { data, local, medico, paciente } = response.data.consulta;

      setConsulta({ data: formateDate(data), local, medico, paciente });
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const formateDate = (date: string) => {
    return moment(date).format('YYYY-MM-DD');
  }

  const handelCancel = () => {
    history.push('/consultas/index');
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    event.preventDefault();

    api.put(`/consultas/${id}`, consulta).then(response => {

      history.push('/consultas/index');
    }).catch(error => {
      console.log(error);
    })
  }

  const onChangeLocal = (event: any) => {
    setConsulta({
      ...consulta,
      local: event.target.value
    });
  }

  const onChangeData = (event: any) => {
    setConsulta({
      ...consulta,
      data: event.target.value
    });
  }

  const onChangeMedico = (event: any) => {
    setConsulta({
      ...consulta,
      medico: event.target.value
    });
  }

  const onChangePaciente = (event: any) => {
    setConsulta({
      ...consulta,
      paciente: event.target.value
    });
  }

  return (
    <div>
      <Header />

      <Container className="mt-5">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formAddConsultaLocal">
            <Form.Label>Local</Form.Label>
            <Form.Control required onChange={onChangeLocal} value={consulta.local} type="text" placeholder="Digite o local da consulta" />
            <Form.Control.Feedback type="invalid">
              Por favor insira o local.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formAddConsultaData">
            <Form.Label>Data</Form.Label>
            <Form.Control required value={consulta.data} type="date" onChange={onChangeData} />
            <Form.Control.Feedback type="invalid">
              Por favor insira uma data.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formAddConsultaMedico">
            <Form.Label>Médico</Form.Label>
            <Form.Control required value={consulta.medico} as="select" onChange={onChangeMedico}>
              <option value={''}>Selecione um médico</option>
              {opcoes.map(item => {
                return (<option key={item.value} value={item.value}>{item.label}</option>)
              })}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Por favor selecione um médico.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formAddConsultaPaciente">
            <Form.Label>Paciente</Form.Label>
            <Form.Control required value={consulta.paciente} as="select" onChange={onChangePaciente}>
              <option value={''}>Selecione um paciente</option>
              {opcoes.map(item => {
                return (<option key={item.value} value={item.value}>{item.label}</option>)
              })}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Por favor selecione um paciente.
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="outline-dark" className="mr-3" onClick={handelCancel}>
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

export default EditarConsulta;