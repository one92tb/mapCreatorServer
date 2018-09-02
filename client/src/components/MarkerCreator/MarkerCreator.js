import React, {Component} from 'react';
import {postMarkerRecord} from '../../actions/postMarkerRecord';
import {connect} from 'react-redux';
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
  constructor(props) {
    super(props);
    this.state = {
      markerName: '',
      markerImage: ''
    }

    this.onChange = this.onChange.bind(this);
    this.sendRecord = this.sendRecord.bind(this);
  }

  onChange(event) {
    if (event.target.name === "markerName") {
      this.setState({markerName: event.target.value})
    } else {
      this.setState({markerImage: event.target.files[0]})
    }
  }

  sendRecord(event) {
    event.preventDefault();
    const postMarkerRecord = this.props.postMarkerRecord;

    const fd = new FormData();

    fd.append('file', this.state.markerImage);
    fd.append('markerName', this.state.markerName);

    postMarkerRecord(fd);
  }

  render() {
    console.log(this.state);
    return (<div>
      <div className="markerImage"></div>
      <Form onSubmit={this.sendRecord}>
        <FormGroup>
          <Label for="exampleText">Name</Label>
          <Input type="text" name="markerName" onChange={(e) => this.onChange(e)}/>
        </FormGroup>
        <FormGroup>
          <Input type="file" name="markerImage" onChange={(e) => this.onChange(e)}/>
          <FormText color="muted"></FormText>
        </FormGroup>
        <Button>Upload</Button>
      </Form>
    </div>);
  }
}

const mapStateToProps = {}

const mapDispatchToProps = {
  postMarkerRecord
}

export default connect(null, mapDispatchToProps)(MarkerCreator);
