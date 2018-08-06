import React, {Component} from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import './markerCreator.css'

class MarkerCreator extends Component {
  render() {
    return (<div>
      <div className="markerImage">
      
      </div>
      <Form>
        <FormGroup>
          <Label for="exampleText">Name</Label>
          <Input type="text" name="text" id="exampleText"/>
        </FormGroup>
        <FormGroup>
          <Input type="file" name="file" id="exampleFile"/>
          <FormText color="muted"></FormText>
        </FormGroup>
      </Form>
    </div>);
  }
}

export default MarkerCreator;
