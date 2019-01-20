import styled from "styled-components";

const RowStyle = styled.div`
  height: 100%;
  margin: 0 !important;
`;

const ColStyle = styled.div`
  padding: 0!important
  height: 100%;

  @media only screen and (max-width: 991.98px) {
    height: auto;
        &:not(:first-child) {
          height: ${props =>
            props.currentLocation.pathname === "/" ? "100%" : "auto"};
          display: block;
        }
  }
`;

export { RowStyle, ColStyle };
