import React, { Component } from "react";
import MarkerList from "./MarkerList/MarkerList";
import { isNavSelect } from "../../../actions/isNavSelect";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Wrapper,
  FilterLink,
  SelectLink,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  Nav
} from "./style";

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: true
    };
  }

  switch = bool => {
    const { isSelected } = this.props;
    this.setState({
      isSelected: bool
    });

    isNavSelect(isSelected);
  };

  render() {
    const { isSelected } = this.state;
    return (
      <Wrapper>
        <Card>
          <CardHeader>
            <Nav>
              <NavItem>
                <SelectLink
                  isSelected={isSelected}
                  onClick={() => this.switch(true)}
                >
                  Select marker
                </SelectLink>
              </NavItem>
              /
              <NavItem>
                <FilterLink
                  isSelected={isSelected}
                  onClick={() => this.switch(false)}
                >
                  Filter marker
                </FilterLink>
              </NavItem>
            </Nav>
          </CardHeader>
          <CardBody className="scroll">
            <MarkerList isNavSelect={isSelected} />
          </CardBody>
        </Card>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  isNavSelect
};

export default connect(
  null,
  mapDispatchToProps
)(Panel);

Panel.propTypes = {
  isNavSelect: PropTypes.func.isRequired
};
