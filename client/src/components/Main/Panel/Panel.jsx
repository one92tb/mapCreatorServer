import React, { Component } from "react";
import MarkerList from "./MarkerList/MarkerList";
import { isPanelSelect } from "../../../actions/isPanelSelect";
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

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (
      location.pathname !== prevProps.location.pathname &&
      location.pathname === "/createMarker"
    ) {
      this.setState({
        isSelected: true
      });
    }
  }

  switch = bool => {
    const { isSelected } = this.props;
    this.setState({
      isSelected: bool
    });

    isPanelSelect(isSelected);
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
                  exact={true}
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
                  location={this.props.location.pathname}
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
  isPanelSelect
};

export default connect(
  null,
  mapDispatchToProps
)(Panel);

Panel.propTypes = {
  isPanelSelect: PropTypes.func.isRequired
};
