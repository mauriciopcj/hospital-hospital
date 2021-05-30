interface IDoencasProps {
  cardiaca: boolean;
  diabetes: boolean;
  renal: boolean;
  cancer: boolean;
}

const doencasDefault: IDoencasProps & Object = {
  cardiaca: false,
  diabetes: false,
  renal: false,
  cancer: false,
}

interface IMedicamentosProps {
  insonia: boolean;
  coracao: boolean;
  diabetes: boolean;
  rins: boolean;
  coluna: boolean;
}

const medicamentosDefault: IMedicamentosProps = {
  insonia: false,
  coracao: false,
  diabetes: false,
  rins: false,
  coluna: false,
}

interface IAlergiasProps {
  lactose: boolean;
  cereais: boolean;
  trigo: boolean;
}

const alergiasDefault: IAlergiasProps = {
  lactose: false,
  cereais: false,
  trigo: false,
}

interface ICirurgiaProps {
  nome: string;
  descricao: string;
  data_entrada: string;
  data_saida: string;
}

interface IProntuarioProps {
  paciente: string;
  doencas: string;
  alergias: string;
  medicamentos: string;
}

const prontuarioDefault: IProntuarioProps = {
  paciente: "",
  doencas: "",
  alergias: "",
  medicamentos: "",
}

export { 
  doencasDefault, 
  medicamentosDefault, 
  prontuarioDefault, 
  alergiasDefault 
}