import {
  Container,
  Form,
  FormWrapper,
  Wrapper,
  WrapperButton,
  ButtonStyled,
  TextFieldStyled,
  Welcome,
  Content,
  Header,
  Paragraph,
  Contents,
} from "./styles";
import { useForm } from "react-hook-form";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit } = useForm();
  let history = useHistory();
  let auth = useAuth();

  const onSubmit = ({ username, password }) => {
    const onLogin = async () => {
      try {
        await auth.login({ username, password });
        history.push("/");
        return <Redirect to="/" />;
      } catch (error) {
        toast.error("Ocorreu um erro ao tentar login no sistema");
      }
    };
    onLogin();
  };

  return (
    <Container>
      <Contents>
        <Content>
          <Header>Bem-vindo(a)!</Header>
          <Paragraph>
            Para entrar no sistema hospitalar, digite sua senha e seu nome de
            usuário ao lado.
          </Paragraph>
          <Paragraph>
            A rede Sistema Hospitalar integra diversos serviços como o hospital,
            a farmácia e a clínica.
          </Paragraph>
          <Paragraph>
            Se ainda não possui cadastro, clique{" "}
            <Link to={"/cadastro"}>aqui.</Link>
          </Paragraph>
        </Content>
        <Content>
          <Header>
            <Header>Entrar</Header>
          </Header>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Wrapper>
              <TextFieldStyled
                label="usuário"
                id="margin-none"
                {...register("username")}
              />
            </Wrapper>
            <Wrapper>
              <TextFieldStyled
                label="senha"
                id="margin-none"
                {...register("password")}
              />
            </Wrapper>
            <WrapperButton>
              <ButtonStyled variant="contained" type="submit">
                Login
              </ButtonStyled>
            </WrapperButton>
          </Form>
        </Content>
      </Contents>
    </Container>
  );
};

export default Login;
