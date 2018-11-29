import styled from "styled-components";
import { css } from "styled-components";

const Wrapper = styled.div`
  background: #f2f2f2;
  height: 100%;
  width: 100%;
  padding-top: 100px;
`;

const Inner = styled.div`
  width: 400px;
  border: 1px solid #6c757d;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.25rem;
`;

const Form = styled.form`
  padding: 20px;
`;

const FormGroup = styled.div`
  position: relative;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 10px;
  display: block;
  margin-left: 2px;
`;

const Label = styled.label`
  display: block;
  margin-left: 2px;
`;

const Button = css`
  cursor: pointer;
  height: 40px;
  width: 165px;
  padding: 0.375rem 0.75rem;
  border: 1px solid #00b8e6;
  color: #fff;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
`;

const RegisterBtn = styled.button`
  ${Button};
  background-color: ${props => (!props.status ? "#00b8e6" : "#4ddbff")};
`;

const LoginBtn = styled.button`
  ${Button};
  background-color: ${props => (props.status ? "#00b8e6" : "#4ddbff")};
`;

const SubmitBtn = styled.button`
  ${Button};
  background-color: #00b8e6;
  margin-top: 4px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #6c757d;
  width: 100%;
  height: 80px;
  padding: 20px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  display: block;
  border: 1px solid #ced4da;
`;

export {
  Wrapper,
  Inner,
  ButtonWrapper,
  RegisterBtn,
  LoginBtn,
  Form,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitBtn
};
