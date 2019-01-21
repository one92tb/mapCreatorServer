import React from "react";
import { Wrapper, TextBox } from "./style";

class NoAuthorization extends React.Component {
  render() {
    return (
      <Wrapper>
        <TextBox>
          You have no permission to access this components. You must have admin
          status.
        </TextBox>
      </Wrapper>
    );
  }
}

export default NoAuthorization;
