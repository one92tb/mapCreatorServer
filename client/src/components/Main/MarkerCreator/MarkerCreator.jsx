import React, { Component } from "react";
import { getSelectedMarker } from "../../../actions/marker/getSelectedMarker";
import { postMarker } from "../../../actions/marker/postMarker";
import { removeMarker } from "../../../actions/marker/removeMarker";
import { editMarker } from "../../../actions/marker/editMarker";
import { fetchMarkers } from "../../../actions/marker/fetchMarkers";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import validate from "../../../validate";
import { errors, markerValidationDetails } from "../../../schema/markerSchema";
import {
  Wrapper,
  Inner,
  ImageInsideMarker,
  ImageWithoutMarker,
  Form,
  FormGroup,
  LabelColor,
  LabelFile,
  LabelName,
  HideInput,
  Input,
  InputFile,
  SubmitBtn,
  RemoveBtn,
  DownloadBtn,
  MarkerIcon,
  UploadButton,
  CustomButton,
  ImageBox,
  AdditionalWrapper,
  MarkerIconBox,
  ButtonGroup,
  ErrorMessage
} from "./style";

const domtoimage = require("dom-to-image");

class MarkerCreator extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.textInput = React.createRef();
    this.state = {
      markerName: "",
      markerImageFile: "",
      displaySelectedImage: "IMG-default.png",
      color: "#000",
      uploadStatus: true,
      markerNameError: "",
      markerImageFileError: ""
    };
  }

  componentDidMount() {
    const { fetchMarkers } = this.props;
    fetchMarkers();
  }

  componentDidUpdate(prevProps) {
    const { selectedMarker } = this.props;
    if (selectedMarker.id !== prevProps.selectedMarker.id) {
      this.setState({
        markerName: selectedMarker.name,
        displaySelectedImage: selectedMarker.url,
        markerImageFile: ""
      });
    }
  }

  onChange = event => {
    const { markerImageFile } = this.state;

    if (event.target.name === "markerName") {
      this.setState({ markerName: event.target.value });
      if (event.target.value.length > 2) {
        this.setState({
          markerNameError: ""
        });
      }
    } else if (event.target.name === "color") {
      this.setState({ color: event.target.value });
    } else {
      if (event.target.files[0]) {
        this.setState(
          {
            markerImageFile: event.target.files[0],
            displaySelectedImage: URL.createObjectURL(event.target.files[0])
          },
          () =>
            /\.(png)$/i.test(markerImageFile.name) &&
            this.setState({ markerImageFileError: "" })
        );
      }
    }
  };

  sendRecord = event => {
    event.preventDefault();
    const { postMarker, editMarker, selectedMarker, markers } = this.props;
    const { markerImageFile, markerName } = this.state;
    console.log(markers);
    const data = {
      markerName,
      markerImageFile,
      selectedMarker,
      markers
    };

    const validationResult = validate(errors, markerValidationDetails, data);

    let fd = new FormData();

    fd.append("file", markerImageFile);
    fd.append("markerName", markerName);

    if (!validationResult.isError) {
      if (selectedMarker.id && !selectedMarker.isDeleted) {
        if (markerImageFile === "") {
          editMarker(
            {
              name: markerName,
              icon: selectedMarker.icon
            },
            selectedMarker.id
          );
        } else {
          editMarker(fd, selectedMarker.id);
        }
      } else {
        postMarker(fd);

        this.setState({
          markerName: "",
          markerImageFile: "",
          displaySelectedImage: "IMG-default.png"
        });
      }
    }

    this.setState({
      ...validationResult.errors
    });
  };

  downloadMarker = () => {
    const { markerName, markerImageFile } = this.state;
    const { selectedMarker } = this.props;
    const data = {
      markerName,
      markerImageFile,
      selectedMarker
    };
    const validationResult = validate(errors, markerValidationDetails, data);

    if (!validationResult.isError) {
      const node = this.myRef;
      domtoimage.toPng(node).then(dataUrl => {
        const link = document.createElement("a");
        link.download = `${markerName}.png`;
        link.href = dataUrl;
        link.click();
      });
    }
    console.log(validationResult.errors);
    this.setState({
      ...validationResult.errors
    });
  };

  removeRecord = () => {
    const { removeMarker, getSelectedMarker, selectedMarker } = this.props;

    this.setState({
      markerName: "",
      markerImageFile: "",
      displaySelectedImage: "IMG-default.png"
    });

    removeMarker(selectedMarker.id);

    getSelectedMarker({
      ...selectedMarker,
      isDeleted: true
    });
  };

  handleUpload = status => {
    this.setState({
      uploadStatus: status,
      markerNameError: "",
      markerImageFileError: ""
    });
  };

  render() {
    const {
      uploadStatus,
      displaySelectedImage,
      color,
      markerName,
      markerImageFile,
      markerNameError,
      markerImageFileError
    } = this.state;
    const { selectedMarker } = this.props;

    return (
      <Wrapper>
        <Inner>
          <ButtonGroup>
            <UploadButton
              status={uploadStatus}
              onClick={() => this.handleUpload(true)}
            >
              Upload Marker
            </UploadButton>
            <CustomButton
              status={uploadStatus}
              onClick={() => this.handleUpload(false)}
            >
              Custom Marker
            </CustomButton>
          </ButtonGroup>
          {uploadStatus ? (
            <ImageBox>
              <ImageWithoutMarker alt="" src={displaySelectedImage} />
            </ImageBox>
          ) : (
            <AdditionalWrapper>
              <MarkerIconBox
                innerRef={div => {
                  this.myRef = div;
                }}
              >
                <MarkerIcon background={color}>
                  <ImageInsideMarker src={displaySelectedImage} />
                </MarkerIcon>
              </MarkerIconBox>
            </AdditionalWrapper>
          )}

          <Form onSubmit={this.sendRecord}>
            <FormGroup>
              <LabelName htmlFor="exampleText">Name</LabelName>
              <Input
                type="text"
                name="markerName"
                value={markerName}
                onChange={e => this.onChange(e)}
              />
              {markerNameError && (
                <ErrorMessage>{markerNameError}</ErrorMessage>
              )}
            </FormGroup>
            {!uploadStatus && (
              <FormGroup>
                <LabelColor htmlFor="exampleColor">Color</LabelColor>
                <Input
                  onChange={e => this.onChange(e)}
                  type="color"
                  name="color"
                  id="exampleColor"
                  value={color}
                  placeholder="color placeholder"
                />
              </FormGroup>
            )}
            <FormGroup>
              <LabelFile htmlFor="file">
                <InputFile>Choose file to send</InputFile>{" "}
                {displaySelectedImage === "IMG-default.png"
                  ? "Not file detected"
                  : markerImageFile === ""
                    ? `${markerName}.png`
                    : markerImageFile.name}
              </LabelFile>
              <HideInput
                type="file"
                id="file"
                name="markerImage"
                onChange={e => this.onChange(e)}
              />
              {markerImageFileError && (
                <ErrorMessage>{markerImageFileError}</ErrorMessage>
              )}
            </FormGroup>
            {uploadStatus ? (
              <FormGroup>
                <SubmitBtn>
                  {selectedMarker.id && !selectedMarker.isDeleted
                    ? "Edit Marker"
                    : "Upload new marker"}
                </SubmitBtn>
                {selectedMarker.id && !selectedMarker.isDeleted ? (
                  <RemoveBtn onClick={this.removeRecord} type="button">
                    Remove Marker
                  </RemoveBtn>
                ) : (
                  ""
                )}
              </FormGroup>
            ) : (
              <FormGroup>
                <DownloadBtn onClick={this.downloadMarker} type="button">
                  Download
                </DownloadBtn>
              </FormGroup>
            )}
          </Form>
        </Inner>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  postMarker,
  removeMarker,
  editMarker,
  getSelectedMarker,
  fetchMarkers
};

const mapStateToProps = state => ({
  selectedMarker: state.marker.selectedMarker,
  markers: state.marker.markers
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkerCreator);

MarkerCreator.propTypes = {
  postMarker: PropTypes.func.isRequired,
  removeMarker: PropTypes.func.isRequired,
  editMarker: PropTypes.func.isRequired,
  getSelectedMarker: PropTypes.func.isRequired
};

MarkerCreator.defaultProps = {
  selectedMarker: {}
};
