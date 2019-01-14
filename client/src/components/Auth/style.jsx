import styled from "styled-components";

const ContainerStyle = styled.div`
  height: 100%;
  padding: 0 !important;
`;

const RowStyle = styled.div`
  height: 100%;
  margin: 0 !important;
`;

const ColStyle = styled.div`
  padding: 0!important
  height: 100%;

  @media (max-width: 1199px) {
    &:not(:first-child) {
      height: 92%;
    }
    height:  8%;
    flex-wrap: nowrap;
  }

`;

export { ContainerStyle, RowStyle, ColStyle };
