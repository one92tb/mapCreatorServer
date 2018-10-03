import React, { Component } from "react";
import { postRecord } from "../../actions/postRecord";
import { getSelectedMarker } from "../../actions/getSelectedMarker";
import { removeRecord } from "../../actions/removeRecord";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import "./markerCreator.css";

class MarkerCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markerName: "",
      markerImageFile: "",
      displaySelectedImage: "IMG-default.png"
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedMarker.id !== prevProps.selectedMarker.id) {
      this.setState({
        markerName: this.props.selectedMarker.name,
        displaySelectedImage: this.props.selectedMarker.url,
        markerImageFile: ""
      });
    }
  }

  onChange = event => {
    if (event.target.name === "markerName") {
      this.setState({ markerName: event.target.value });
    } else {
      this.setState({
        markerImageFile: event.target.files[0]
      });
      if (event.target.files[0]) {
        this.setState({
          displaySelectedImage: URL.createObjectURL(event.target.files[0])
        });
      }
    }
  };

  sendRecord = event => {
    event.preventDefault();
    const postRecord = this.props.postRecord;
    const isRemoved = this.props.isRemoved;

    const fd = new FormData();

    fd.append("file", this.state.markerImageFile);
    fd.append("markerName", this.state.markerName);

    postRecord(fd);

    this.setState({
      markerName: "",
      markerImageFile: "",
      displaySelectedImage: "IMG-default.png"
    });
  };

  removeRecord = () => {
    const isRemoved = this.props.isRemoved;
    const removeRecord = this.props.removeRecord;

    removeRecord(this.props.selectedMarker.id);

    this.setState({
      markerName: "",
      markerImageFile: "",
      displaySelectedImage: "IMG-default.png"
    });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="imageBox">
          <img
            className="markerImage"
            alt=""
            src={this.state.displaySelectedImage}
          />
        </div>
        <Form className="markerForm" onSubmit={this.sendRecord}>
          <FormGroup>
            <Label for="exampleText">Name</Label>
            <Input
              type="text"
              name="markerName"
              value={this.state.markerName}
              onChange={e => this.onChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="file">
              <span className="inputLabel">Chose File to Send</span>{" "}
              {this.state.displaySelectedImage === "IMG-default.png"
                ? "Not file detected"
                : this.state.markerImageFile === ""
                  ? this.props.selectedMarker.name
                  : this.state.markerImageFile.name}
            </Label>
            <Input
              type="file"
              id="file"
              name="markerImage"
              className="markerInputFile"
              onChange={e => this.onChange(e)}
            />
          </FormGroup>
          <Button className="addBtn">
            {this.props.selectedMarker.id !== undefined
              ? "Edit Marker"
              : "Upload new marker"}
          </Button>
          {this.props.selectedMarker.id !== undefined ? (
            <Button
              onClick={this.removeRecord}
              type="button"
              className="removeBtn"
              color="danger"
              value="remove Marker"
            >
              Remove Marker
            </Button>
          ) : (
            ""
          )}
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  postRecord,
  removeRecord
};

const mapStateToProps = state => ({
  selectedMarker: state.selectedMarker.selectedMarker
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkerCreator);

//  <span className="inputLabel">Chose File to Send</span> {(this.state.displaySelectedImage === 'IMG-default.png') ? 'Not file detected' : (this.props.selectedMarker.id !== undefined) ? `${this.props.selectedMarker.name}.png` : this.state.markerImageFile.name }
//{(this.props.selectedMarker.id !== undefined) ? 'Edit Marker' : 'Upload new marker'}
