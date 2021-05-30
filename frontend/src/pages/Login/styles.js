import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Image from "../../assets/background1.jpg";

export const Container = styled.div`
  background: url(${Image}) no-repeat fixed center;
  background-color: #000836;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Contents = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
`;

export const Content = styled.div`
  width: 450px;
  height: 458px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
  margin-right: 2rem;
  border: 1px solid rgba(0, 20, 130, 0.4);
  border-radius: 0.8rem;
  padding: 1rem;
  box-shadow: 3px 3px 15px 0px #000836;
`;

export const Paragraph = styled.div`
  margin-top: 3rem;
  font-size: 15px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  font-size: 2rem;
`;

export const Wrapper = styled.div`
  margin: 3rem;
`;

export const TextFieldStyled = styled(TextField)`
  width: 400px;
`;

export const WrapperButton = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: flex-end;
`;

export const ButtonStyled = styled(Button)`
  width: 100px;
`;
