import styled from "styled-components";
import { css } from "styled-components";

const Wrapper = styled.div`
  background: #f2f2f2;
  height: 100%;
  padding: 40px 20px;
`;

const Label = styled.label`
  margin: 0;
`;

const Select = styled.select`
  width: 200px;
  height: 40px;
  color: #000;
  display: block;
  text-align: center;
  border-radius: 5px;
  background: #fff;
  text-align: center;
  text-align-last: center;
`;

const Input = styled.input`
  height: 40px;
  width: 200px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid transparent;
`;

const Form = styled.form`
  height: calc(10% - 20px);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  background: #00b8e6;
  display: flex;
  align-items: center;
  border-radius: 3px;
`;

const TableContainer = styled.div`
  height: 90%;
`;

const Table = styled.table`
  width: 100%;
  display: block;
  height: 100%;
`;

const Thead = styled.thead`
  display: table;
  width: 100%;
`;

const Tbody = styled.tbody`
  overflow: auto;
  overflow-x: hidden;
  display: block;
  width: 100%;
  height: 100%;
  height: calc(100% - 48px);
  text-align: center;
`;

const Tr = styled.tr`
  display: table;
  width: 100%;
  table-layout: fixed;
  margin: 5px 0;
`;

const Cell = css`
  padding: 0.75rem;
  text-align: center;
  width: 10%;

  &:not(:first-child) {
    width: 15%;
  }
`;

const Th = styled.th`
  ${Cell};
  color: #fff;
  background: #00b8e6;
`;

const Td = styled.td`
  ${Cell};
  background: #4ddbff;
`;

export {
  Wrapper,
  Label,
  Select,
  Input,
  Form,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
};
