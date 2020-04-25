import styled from "styled-components";

const ContainerStyle = styled.div`
  height: 100%;
  padding: 0 !important;
  overflow-x: hidden;
  background: #f2f2f2;
`;

const RowStyle = styled.div`
  height: 100%;
  margin: 0 !important;
`;

const ColStyle = styled.div`
  padding: 0px;
  height: 100%;


    @media (max-width: 1199px) {
      &:not(:first-child) {
        height: calc(100% - 60px);
      }
      height:  60px;
      flex-wrap: nowrap;
    }

`;

export { ContainerStyle, RowStyle, ColStyle };
