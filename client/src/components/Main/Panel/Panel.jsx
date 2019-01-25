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
  Nav,
  Label,
  Input
} from "./style";

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: true,
      checked: false
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

  handleCheckBox = event => {
    this.setState({
      checked: event.target.checked
    });
  };

  switch = bool => {
    const { isSelected } = this.props;
    this.setState({
      isSelected: bool
    });

    isPanelSelect(isSelected);
  };

  render() {
    const { location } = this.props;
    const { isSelected } = this.state;
    return (
      <Wrapper currentLocation={location}>
        <Label
          htmlFor="panel"
          currentLocation={location}
          onChange={this.handleCheckBox}
        >
          <img src={"drawMarker.png"} alt="drawMarker" width={30} height={30} />
        </Label>
        <Input type="checkbox" id="panel" onChange={this.handleCheckBox} />
        <Card isChecked={this.state.checked} currentLocation={location}>
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
