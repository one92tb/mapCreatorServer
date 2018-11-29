import styled from "styled-components";

const ContainerStyle = styled.div`
  height: 40%;
  padding: 0 !important;
`;

const RowStyle = styled.div`
  height: 100%;
  margin: 0 !important;
`;
const ColStyle = styled.div`
  padding: 0!important
  height: 100%;
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 40px 20px;
  background: #f2f2f2;
`;

const Form = styled.form`
  height: calc(10% - 20px);
  display: flex;
  padding-right: 30px;
  margin-bottom: 20px;
  justify-content: flex-end;
`;
const Input = styled.input`
  height: 40px;
  width: 250px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #bfbfbf;
`;

export { ContainerStyle, RowStyle, ColStyle, Wrapper, Form, Input };
