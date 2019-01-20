import styled from "styled-components";

const List = styled.div`
  list-style: none;
  padding: 0;
  height: 100%;
`;

const Marker = styled.li`
  margin-bottom: 5px;
  border: 1px solid #4ddbff;
  width: 100%;
  height: 40px;
  border-radius: 3px;
  margin-bottom: 5px !important;
  padding: 0 !important;
  display: flex;

  &:hover {
    background: #4ddbff;
    cursor: pointer;
  }

  ${({ isSelected, isFiltered }) => {
    if (isSelected) {
      return `background: #00b8e6`;
    } else if (isFiltered) {
      return `background: #999; opacity: 0.7`;
    }
  }};
`;

const MarkerIcon = styled.div`
  margin: 0 10px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MarkerName = styled.span`
  width: 75%;
  float: left;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 575.98px) {
    font-size: 12px;
  }
`;

const MarkerImg = styled.img`
  height: 32px;
  width: 32px;

  @media only screen and (max-width: 575.98px) {
    height: 24px;
    width: 24px;
  }
`;

export { List, Marker, MarkerIcon, MarkerName, MarkerImg };
