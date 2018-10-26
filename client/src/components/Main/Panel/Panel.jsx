import React, { Component } from "react";
import MarkerList from "./MarkerList/MarkerList";
import { css } from "styled-components";
import styled from "styled-components";
import { isNavSelect } from "../../../actions/isNavSelect";
import { connect } from "react-redux";

const Wrapper = styled.div`
  background:#f2f2f2
  padding: 40px 10px 40px 20px;
  height: 100%;
`;

const NavLink = css`
  margin: 0 10px;
  cursor: pointer;
`;

const FilterLink = styled.span`
  ${NavLink};

  ${({ isSelected }) =>
    !isSelected &&
    `
    font-weight: bold
  `};
`;

const SelectLink = styled.span`
  ${NavLink};

  ${({ isSelected }) =>
    isSelected &&
    `
    font-weight: bold
  `};
`;

const Card = styled.div`
  height: 100%;
  border: 1px solid #00b8e6;
  width: 100%;
  position: relative;
  display: flex;
  min-width: 0;
  word-wrap: break-word;
  flex-direction: column;
  border-radius: 3px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  border-bottom: 1px solid #00b8e6;
  padding: 0.75rem 1.25rem;
  background: #4ddbff;
  display: block;
`;

const Nav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
  justify-content: center;
`;
const NavItem = styled.li``;

const CardBody = styled.div`
  padding: 1.25rem;
  height: calc(100% - 48px);
  overflow-y: auto;
`;

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: true
    };
  }

  switchToSelect = () => {
    this.setState({
      isSelected: true
    });

    this.props.isNavSelect(true);
  };

  switchToFilter = () => {
    this.setState({
      isSelected: false
    });

    this.props.isNavSelect(false);
  };

  render() {
    console.log(this.state, this.props);
    return (
      <Wrapper>
        <Card>
          <CardHeader>
            <Nav>
              <NavItem>
                <SelectLink
                  isSelected={this.state.isSelected}
                  onClick={this.switchToSelect}
                >
                  Select marker
                </SelectLink>
              </NavItem>
              /
              <NavItem>
                <FilterLink
                  isSelected={this.state.isSelected}
                  onClick={this.switchToFilter}
                >
                  Filter marker
                </FilterLink>
              </NavItem>
            </Nav>
          </CardHeader>
          <CardBody className="scroll">
            <MarkerList isNavSelect={this.state.isSelected} />
          </CardBody>
        </Card>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  isNavSelect,
};

export default connect(
  null,
  mapDispatchToProps
)(Panel);
