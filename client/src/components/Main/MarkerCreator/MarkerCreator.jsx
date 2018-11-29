import React, { Component } from "react";
import { postRecord } from "../../../actions/postRecord";
import { getSelectedMarker } from "../../../actions/getSelectedMarker";
import { removeRecord } from "../../../actions/removeRecord";
import { editRecord } from "../../../actions/editRecord";
import { connect } from "react-redux";
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
      uploadStatus: false,
      markerNameError: "",
      markerImageFileError: ""
    };
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

  validate = () => {
    const { markerName, markerImageFile } = this.state;
    const { selectedMarker } = this.props;

    let isError = false;
    const errors = {
      markerNameError: "",
      markerImageFileError: ""
    };

    const validateArray = [
      {
        condition: markerName.length < 3,
        nameOfErrorProperty: "markerNameError",
        messageError: "Username needs to be atleast 3 characters long"
      },
      {
        condition: !/\.(png)$/i.test(markerImageFile.name) && markerImageFile,
        nameOfErrorProperty: "markerImageFileError",
        messageError: "format must be .png"
      },
      {
        condition: !markerImageFile && !selectedMarker.id,
        nameOfErrorProperty: "markerImageFileError",
        messageError: "Input file cannot be empty"
      }
    ];

    validateArray.forEach(validate => {
      if (validate.condition) {
        isError = true;
        errors[validate.nameOfErrorProperty] = validate.messageError;
      }
    });

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  sendRecord = event => {
    event.preventDefault();
    const { postRecord, editRecord, selectedMarker } = this.props;
    const { markerImageFile, markerName } = this.state;
    const err = this.validate();

    let fd = new FormData();

    fd.append("file", markerImageFile);
    fd.append("markerName", markerName);

    if (!err) {
      if (selectedMarker.id && !selectedMarker.isDeleted) {
        if (markerImageFile === "") {
          editRecord(
            {
              name: markerName,
              icon: selectedMarker.icon
            },
            selectedMarker.id
          );
        } else {
          console.log("z pliku");
          editRecord(fd, selectedMarker.id);
        }
      } else {
        postRecord(fd);

        this.setState({
          markerName: "",
          markerImageFile: "",
          displaySelectedImage: "IMG-default.png"
        });
      }
    }
  };

  downloadMarker = () => {
    const { markerName } = this.state;
    const err = this.validate();

    if (!err) {
      const node = this.myRef;
      domtoimage.toPng(node).then(dataUrl => {
        var link = document.createElement("a");
        link.download = `${markerName}.png`;
        link.href = dataUrl;
        link.click();
      });
    }
  };

  removeRecord = () => {
    const { removeRecord, getSelectedMarker, selectedMarker } = this.props;

    this.setState({
      markerName: "",
      markerImageFile: "",
      displaySelectedImage: "IMG-default.png"
    });

    removeRecord(selectedMarker.id);

    getSelectedMarker({
      ...selectedMarker,
      isDeleted: true
    });
  };

  handleUpload = status => {
    this.setState({
      uploadStatus: status
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
  postRecord,
  removeRecord,
  editRecord,
  getSelectedMarker
};

const mapStateToProps = state => ({
  selectedMarker: state.selectedMarker.selectedMarker
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkerCreator);
