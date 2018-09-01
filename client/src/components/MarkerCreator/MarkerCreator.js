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
  constructor(props){
    super(props);
    this.state = {
      selectedFile: null
    }

    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
  }

  fileSelectedHandler(e){
    console.log(e.target.files[0]);
  }

  render() {
    console.log(this.state);
    return (<div>
      <div className="markerImage">

      </div>
      <Form>
        <FormGroup>
          <Label for="exampleText">Name</Label>
          <Input type="text" name="text" id="exampleText"/>
        </FormGroup>
        <FormGroup>
          <Input type="file" name="file" id="exampleFile" onChange={(e) => this.fileSelectedHandler(e)}/>
          <FormText color="muted"></FormText>
        </FormGroup>
        <Button>Upload</Button>
      </Form>
    </div>);
  }
}

export default MarkerCreator;
