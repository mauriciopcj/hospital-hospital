import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import {
  Button,
  Form,
  Container,
} from 'react-bootstrap';

import Header from '../../../components/Header';

import api from '../../../services/api';

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

interface ICirurgiaProps {
  nome: string;
  descricao: string;
  data_entrada: string;
  data_saida: string;
}

interface IProntuarioProps {
  doencas: string;
  alergias: string;
  medicamentos: string;
  cirurgias: ICirurgiaProps[];
}

const prontuarioDefault = {
  doencas: "",
  alergias: "",
  medicamentos: "",
  cirurgias: []
}

interface IDoencasProps {
  cardiaca: boolean;
  diabetes: boolean;
  renal: boolean;
  cancer: boolean;
}

const doencasDefault = {
  cardiaca: false,
  diabetes: false,
  renal: false,
  cancer: false,
}

const AdicionarProntuario: React.FC = () => {

  const history = useHistory();

  const [validated, setValidated] = useState(false);
  const [prontuario, setProntuario] = useState<IProntuarioProps>(prontuarioDefault);
  const [doencas, setDoencas] = useState<IDoencasProps>(doencasDefault);

  useEffect(() => {
    setProntuario(prontuarioDefault);
  }, []);

  useEffect(() => {
    console.log(doencas);
  }, [doencas]);

  const handleCancel = () => {
    history.push('/prontuarios/index');
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
  
      api.post('/prontuarios', prontuario).then(response => {  
        history.push('/prontuarios/index');
      }).catch(error => {
        console.log(error);
      })
    }
    setValidated(true);
  }

  // const onChangeLocal = (event: any) => {
  //   setProntuario({
  //     ...prontuario,
  //     local: event.target.value
  //   });
  // }

  // const onChangeData = (event: any) => {
  //   setProntuario({
  //     ...consulta,
  //     data: event.target.value
  //   });
  // }

  // const onChangeMedico = (event: any) => {
  //   setProntuario({
  //     ...consulta,
  //     medico: event.target.value
  //   });
  // }

  // const onChangePaciente = (event: any) => {
  //   setProntuario({
  //     ...consulta,
  //     paciente: event.target.value
  //   });
  // }

  // const onChangeObservacoes = (event: any) => {
  //   setProntuario({
  //     ...consulta,
  //     observacoes: event.target.value
  //   });
  // }

  const items = [
    {
      href: "/",
      name: "Home",
      isActive: false,
    },
    {
      href: "/prontuarios/index",
      name: "Prontuários",
      isActive: false,
    },
    {
      href: "/prontuarios/adicionar",
      name: "Adicionar",
      isActive: true,
    },
  ]

  const handle_checkbox_doencas = () => {

  }

  return (
    <div style={{ background: "#f3f3f3", minHeight: "100vh" }}>
      <Header items={[...items]}/>

      <Container className="mt-5">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formAddConsultaLocal">
            <Form.Label>Histórico de doenças</Form.Label>
            <Form.Check 
              checked={doencas.cardiaca}
              onChange={() => setDoencas({...doencas, cardiaca: !doencas.cardiaca })}
              type="checkbox"
              label="cardiaca"
            />
            <Form.Check 
              checked={doencas.diabetes}
              onChange={() => setDoencas({...doencas, diabetes: !doencas.diabetes})}
              type="checkbox"
              label="diabetes"
            />
            <Form.Check 
              checked={doencas.renal}
              onChange={() => setDoencas({...doencas, renal: !doencas.renal})}
              type="checkbox"
              label="renal"
            />
            <Form.Check 
              checked={doencas.cancer}
              onChange={() => setDoencas({...doencas, cancer: !doencas.cancer})}
              type="checkbox"
              label="cancer"
            />
          </Form.Group>

          <Form.Group controlId="formAddConsultaLocal">
            <Form.Label>Medicamentos</Form.Label>
              <Form.Check 
                checked={doencas.cardiaca}
                onChange={() => setDoencas({...doencas, cardiaca: !doencas.cardiaca })}
                type="checkbox"
                label="cardiaca"
              />
              <Form.Check 
                checked={doencas.diabetes}
                onChange={() => setDoencas({...doencas, diabetes: !doencas.diabetes})}
                type="checkbox"
                label="diabetes"
              />
              <Form.Check 
                checked={doencas.renal}
                onChange={() => setDoencas({...doencas, renal: !doencas.renal})}
                type="checkbox"
                label="renal"
              />
              <Form.Check 
                checked={doencas.cancer}
                onChange={() => setDoencas({...doencas, cancer: !doencas.cancer})}
                type="checkbox"
                label="cancer"
              />
            </Form.Group>

            <Form.Group controlId="formAddConsultaLocal">
              <Form.Label>Alergias</Form.Label>
                <Form.Check 
                  checked={doencas.cardiaca}
                  onChange={() => setDoencas({...doencas, cardiaca: !doencas.cardiaca })}
                  type="checkbox"
                  label="cardiaca"
                />
                <Form.Check 
                  checked={doencas.diabetes}
                  onChange={() => setDoencas({...doencas, diabetes: !doencas.diabetes})}
                  type="checkbox"
                  label="diabetes"
                />
                <Form.Check 
                  checked={doencas.renal}
                  onChange={() => setDoencas({...doencas, renal: !doencas.renal})}
                  type="checkbox"
                  label="renal"
                />
                <Form.Check 
                  checked={doencas.cancer}
                  onChange={() => setDoencas({...doencas, cancer: !doencas.cancer})}
                  type="checkbox"
                  label="cancer"
                />
              </Form.Group>
          
          

          <Button variant="outline-dark" className="mr-3" onClick={handleCancel}>
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

export default AdicionarProntuario;