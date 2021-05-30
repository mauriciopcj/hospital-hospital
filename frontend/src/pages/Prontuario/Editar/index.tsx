import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';

import {
  Button,
  Form,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import Header from '../../../components/Header';

import api from '../../../services/api';
import UserService from '../../../services/UserService';
import { styles } from './styles';

import { 
  doencasDefault,
  medicamentosDefault,
  prontuarioDefault,
  alergiasDefault,
} from '../Adicionar/mock';

interface UsuarioProps {
  id: string;
  username: string;
}

type TParams = { id: string };

const EditarProntuario: React.FC<RouteComponentProps<TParams>> = ({ match }) => {

  const { id } = match.params;

  const history = useHistory();

  const [validated, setValidated] = useState(false);
  const [prontuario, setProntuario] = useState(prontuarioDefault);
  const [doencas, setDoencas] = useState(doencasDefault);
  const [medicamentos, setMedicamentos] = useState(medicamentosDefault);
  const [alergias, setAlergias] = useState(alergiasDefault);
  const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);


  useEffect(() => {
    get_users();

    api.get(`/prontuarios/${id}`).then(response => {
      const { id, paciente, doencas: d, alergias: a, medicamentos: m } = response.data.prontuario;

      let arr_d = d.split(";");
      let arr_a = a.split(";");
      let arr_m = m.split(";");

      let res_doencas = doencas;
      let res_alergias = alergias;
      let res_medicamentos = medicamentos;

      for (let i in d.split(";")) {
        let res = Object.keys(doencas).find((key) => key === arr_d[i]);
        res && (res_doencas = { ...res_doencas, [res]: true});
      }      
      for (let i in a.split(";")) {
        let res = Object.keys(alergias).find(key => key === arr_a[i]);
        res && (res_alergias = { ...res_alergias, [res]: true});
      }
      for (let i in m.split(";")) {
        let res = Object.keys(medicamentos).find(key => key === arr_m[i]);
        res && (res_medicamentos = { ...res_medicamentos, [res]: true});
      }

      setDoencas({...doencas, ...res_doencas});
      setAlergias({...alergias, ...res_alergias});
      setMedicamentos({...medicamentos, ...res_medicamentos});
      setProntuario({ ...prontuario, paciente: paciente });
    }).catch(error => {
      console.log(error);
    });    
  }, []);

  const handleCancel = () => {
    history.push('/prontuarios/index');
  }

  const get_users = async () => {
    const result = await UserService.getAll();
    setUsuarios(result);
  }

  const onChangePaciente = (event: any) => {
    setProntuario({
      ...prontuario,
      paciente: event.target.value
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();

      console.log(prontuario);

      api.put(`/prontuarios/${id}`, format_prontuario()).then(response => {
        history.push('/prontuarios/index');
      }).catch(error => {
        console.log(error);
      });

    }
    setValidated(true);
  }

  const format_prontuario = () => {
    let alerg = "";
    let doen = "";
    let medic = "";
    for (var [key, value] of Object.entries(alergias)) {
      if (value) {
        alerg += key + ";";      
      }
    }
    for (var [key, value] of Object.entries(doencas)) {
      if (value) {
        doen += key + ";";      
      }
    }
    for (var [key, value] of Object.entries(medicamentos)) {
      if (value) {
        medic += key + ";";      
      }
    }

    return ({
      ...prontuario,
      alergias: alerg,
      doencas: doen,
      medicamentos: medic
    })
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
      isActive: false,
    },
    {
      href: "/prontuarios/editar",
      name: "Editar",
      isActive: true,
    },
  ]

  return (
    <div>
      <Header items={[...items]}/>

      <Container className="mt-5">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {usuarios && <Form.Group controlId="formEditProntuarioPaciente">
            <Form.Label>Paciente</Form.Label>
            <Form.Control required disabled as="select" value={prontuario.paciente} onChange={onChangePaciente}>
              <option value={''}>Selecione um paciente</option>
              {usuarios.map(item => {
                return (<option key={item.id} value={item.id}>{item.username}</option>)
              })}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Por favor selecione um paciente.
            </Form.Control.Feedback>
          </Form.Group>}            
          <Row style={styles.checkbox_group}>
            <Col>
              <Form.Group controlId="formEditProntuarioDoencas">
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
            </Col>
            <Col>
              <Form.Group controlId="formEditProntuarioMedicamentos">
                <Form.Label>Medicamentos</Form.Label>
                <Form.Check 
                  checked={medicamentos.insonia}
                  onChange={() => setMedicamentos({...medicamentos, insonia: !medicamentos.insonia })}
                  type="checkbox"
                  label="insonia"
                />
                <Form.Check 
                  checked={medicamentos.rins}
                  onChange={() => setMedicamentos({...medicamentos, rins: !medicamentos.rins })}
                  type="checkbox"
                  label="rins"
                />
                <Form.Check 
                  checked={medicamentos.coluna}
                  onChange={() => setMedicamentos({...medicamentos, coluna: !medicamentos.coluna })}
                  type="checkbox"
                  label="coluna"
                />
                <Form.Check 
                  checked={medicamentos.coracao}
                  onChange={() => setMedicamentos({...medicamentos, coracao: !medicamentos.coracao })}
                  type="checkbox"
                  label="coracao"
                />
                <Form.Check 
                  checked={medicamentos.diabetes}
                  onChange={() => setMedicamentos({...medicamentos, diabetes: !medicamentos.diabetes })}
                  type="checkbox"
                  label="diabetes"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formEditProntuarioAlergias">
                <Form.Label>Alergias</Form.Label>
                <Form.Check 
                  checked={alergias.lactose}
                  onChange={() => setAlergias({...alergias, lactose: !alergias.lactose })}
                  type="checkbox"
                  label="lactose"
                />
                <Form.Check 
                  checked={alergias.cereais}
                  onChange={() => setAlergias({...alergias, cereais: !alergias.cereais })}
                  type="checkbox"
                  label="cereais"
                />
                <Form.Check 
                  checked={alergias.trigo}
                  onChange={() => setAlergias({...alergias, trigo: !alergias.trigo })}
                  type="checkbox"
                  label="trigo"
                />
              </Form.Group>          
            </Col>
          </Row>


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

export default EditarProntuario;