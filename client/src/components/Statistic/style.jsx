import styled from "styled-components";

const Inner = styled.div`
  display: block;
  width: 100%;
  height: 100%;

  @media only screen and (max-width: 1199.98px) {
    padding-left: 150px;
  }
  @media only screen and (max-width: 767.98px) {
    padding-left: 0;
  }
`;

const ContainerStyle = styled.div`
  height: 40%;
  padding: 0 !important;

  @media only screen and (max-width: 767.98px) {
    display: none;
  }
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

  @media (max-width: 1199.98px) {
    height: auto;
    padding: 10px 5px 5px 5px;
  }
`;

const Form = styled.form`
  height: calc(10% - 20px);
  display: flex;
  padding-right: 30px;
  margin-bottom: 20px;
  justify-content: flex-end;

  @media only screen and (max-width: 767.98px) {
    height: auto;
    margin-bottom: 10px;
    padding-right: 20px;
  }

  @media only screen and (max-width: 350px) {
    margin-bottom: 5px;
    padding-right: 10px;
  }
`;

const Input = styled.input`
  height: 40px;
  width: 250px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #bfbfbf;

  @media only screen and (max-width: 767.98px) {
    height: auto;
    margin: 0;
    padding-right: 20px;
    width: 150px;
    height: 30px;
    border-radius: 3px;
    font-size: 14px;
  }

  @media only screen and (max-width: 350px) {
    padding-right: 10px;
    width: 120px;
    height: 20px;
    border: 1px solid #000;
    border-radius: 2px;
    font-size: 11px;
  }
`;


export { ContainerStyle, RowStyle, ColStyle, Wrapper, Form, Input, Inner, };
