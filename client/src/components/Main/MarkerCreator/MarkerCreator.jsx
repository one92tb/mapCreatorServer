import React, { Component } from "react";
import { postRecord } from "../../../actions/postRecord";
import { getSelectedMarker } from "../../../actions/getSelectedMarker";
import { removeRecord } from "../../../actions/removeRecord";
import { editRecord } from "../../../actions/editRecord";
import { connect } from "react-redux";
import styled from "styled-components";
import { css } from "styled-components";
const domtoimage = require("dom-to-image");

const Wrapper = styled.div`
  background: #f2f2f2;
  padding: 40px 20px 40px 10px;
  height: 100%;
`;

const Inner = styled.div`
  border: 1px solid red;
  height: 100%;
  padding: 30px;
  border: 1px solid #00b8e6;
`;

const ImageInsideMarker = styled.img`
  width: 25px;
  height: 25px;
`;

const ImageWithoutMarker = styled.img`
  width: 50px;
  height: 50px;
  display: block;
  text-align: center;
`;

const Form = styled.form`
  display: block;
  margin-top: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  position: relative;
`;

const Label = css`
  margin-bottom: 0;
  cursor: pointer;
`;

const LabelColor = styled.label`
  ${Label};
  margin-left: 2px;
`;

const LabelFile = styled.label`
  ${Label};
`;

const LabelName = styled.label`
  ${Label};
  margin-left: 2px;
`;

const HideInput = styled.input`
  visibility: hidden;
  position: absolute;
  opacity: 0;
  z-index: 99;
`;

const InputStyle = css`
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
`;

const InputName = css`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  border: 1px solid #ced4da;
`;

const Button = css`
  width: 165px;
  cursor: pointer;
  color: #fff;
  border: 1px solid transparent;
  display: inline-block;
`;

const CrudButton = css`
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  padding: 0.375rem 0.75rem;
`;

const Input = styled.input`
  ${InputStyle} ${InputName};
  z-index: -00;
  background-color: #fff;
  height: 40px;
`;

const InputFile = styled.span`
  ${InputStyle} ${Button}
  margin-right: 10px;
  margin-bottom: 0;
  border-color: #00b8e6;
  padding: 6px 12px;
  height: 100%;
  background: #00b8e6;
  height: 38px;
`;

const SubmitBtn = styled.button`
  ${InputStyle};
  ${Button};
  ${CrudButton};
  margin-right: 10px;
  background-color: #6c757d;
  border-color: #6c757d;
`;

const RemoveBtn = styled.button`
  ${InputStyle};
  ${Button};
  ${CrudButton};
  background-color: #ff6666;
  border-color: #ff6666;
`;

const DownloadBtn = styled.button`
  ${Button};
  ${CrudButton};
  ${InputStyle};
  background-color: #6c757d;
  border-color: #6c757d;
`;

const MarkerIcon = styled.div`
position: absolute;
border-radius: 50%;
border: 8px solid ${props => props.background && props.background}
width: 60px;
height: 60px;
top: 7px;
background: ${props => props.background && props.background}
display: flex;
justify-content: center;
align-items: center;

&::after {
  position: absolute;
  content: "";
  width: 0px;
  height: 0px;
  bottom: -45px;
  left: 2px;
  border: 20px solid transparent;
  border-top: 25px solid ${props => props.background && props.background}
}
`;

const UploadButton = styled.button`
  ${Button};
  ${CrudButton};
  background-color: ${props => (props.status ? "#00b8e6" : "#B2CFE7")};
  border-color: #00b8e6;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
`;

const CustomButton = styled.button`
  ${Button};
  ${CrudButton};
  font-size: 1rem;
  line-height: 1.5;
  background-color: ${props => (!props.status ? "#00b8e6" : "#B2CFE7")};
  border-color: #00b8e6;
  border-right: 1px solid #00b8e6;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
`;

const imageWrapper = css`
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
`;

const ImageBox = styled.div`
  ${imageWrapper};
  border: 1px solid #495057;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AdditionalWrapper = styled.div`
  ${imageWrapper};
  border: 1px solid #000;
`;

const MarkerIconBox = styled.div`
  ${imageWrapper};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonGroup = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 10px;
  display: block;
  margin-left: 2px;
`;

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
            /\.(png)$/i.test(this.state.markerImageFile.name) &&
            this.setState({ markerImageFileError: "" })
        );
      }
    }
  };

  validate = () => {
    let isError = false;
    const errors = {
      markerNameError: "",
      markerImageFileError: ""
    };

    if (this.state.markerName.length < 3) {
      isError = true;
      errors.markerNameError = "Username needs to be atleast 3 characters long";
    }
    console.log(/\.(png)$/i.test(this.state.markerImageFile.name));
    if (!/\.(png)$/i.test(this.state.markerImageFile.name)) {
      isError = true;
      errors.markerImageFileError = "format must be .png";
    }

    if (!this.state.markerImageFile) {
      isError = true;
      errors.markerImageFileError = "Input file cannot be empty";
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  sendRecord = event => {
    event.preventDefault();
    const err = this.validate();

    const postRecord = this.props.postRecord;
    const editRecord = this.props.editRecord;

    let fd = new FormData();
    console.log(this.state.markerImageFile);
    fd.append("file", this.state.markerImageFile);
    fd.append("markerName", this.state.markerName);

    console.log("fd", this.state.markerImageFile, this.state.markerName);

    if (this.props.selectedMarker.id && !this.props.selectedMarker.isDeleted) {
      if (this.state.markerImageFile === "") {
        editRecord(
          {
            name: this.state.markerName,
            icon: this.props.selectedMarker.icon
          },
          this.props.selectedMarker.id
        );
      } else {
        console.log("z pliku");
        editRecord(fd, this.props.selectedMarker.id);
      }
    } else {
      if (!err) {
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
    const err = this.validate();

    if (!err) {
      const node = this.myRef;
      domtoimage.toPng(node).then(dataUrl => {
        var link = document.createElement("a");
        link.download = `${this.state.markerName}.png`;
        link.href = dataUrl;
        link.click();
      });
    }
  };

  removeRecord = () => {
    const removeRecord = this.props.removeRecord;
    const getSelectedMarker = this.props.getSelectedMarker;

    this.setState({
      markerName: "",
      markerImageFile: "",
      displaySelectedImage: "IMG-default.png"
    });

    removeRecord(this.props.selectedMarker.id);

    getSelectedMarker({
      ...this.props.selectedMarker,
      isDeleted: true
    });
  };

  handleUpload = status => {
    this.setState({
      uploadStatus: status
    });
  };

  render() {
    console.log(this.props, this.state, this.myRef);
    return (
      <Wrapper>
        <Inner>
          <ButtonGroup>
            <CustomButton
              status={this.state.uploadStatus}
              onClick={() => this.handleUpload(false)}
            >
              Custom Marker
            </CustomButton>
            <UploadButton
              status={this.state.uploadStatus}
              onClick={() => this.handleUpload(true)}
            >
              Upload Marker
            </UploadButton>
          </ButtonGroup>
          {this.state.uploadStatus ? (
            <ImageBox>
              <ImageWithoutMarker
                alt=""
                src={this.state.displaySelectedImage}
              />
            </ImageBox>
          ) : (
            <AdditionalWrapper>
              <MarkerIconBox
                innerRef={div => {
                  this.myRef = div;
                }}
              >
                <MarkerIcon background={this.state.color}>
                  <ImageInsideMarker src={this.state.displaySelectedImage} />
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
                value={this.state.markerName}
                onChange={e => this.onChange(e)}
              />
              {this.state.markerNameError && (
                <ErrorMessage>{this.state.markerNameError}</ErrorMessage>
              )}
            </FormGroup>
            {!this.state.uploadStatus && (
              <FormGroup>
                <LabelColor htmlFor="exampleColor">Color</LabelColor>
                <Input
                  onChange={e => this.onChange(e)}
                  type="color"
                  name="color"
                  id="exampleColor"
                  value={this.state.color}
                  placeholder="color placeholder"
                />
              </FormGroup>
            )}
            <FormGroup>
              <LabelFile htmlFor="file">
                <InputFile>Choose file to send</InputFile>{" "}
                {this.state.displaySelectedImage === "IMG-default.png"
                  ? "Not file detected"
                  : this.state.markerImageFile === ""
                    ? `${this.state.markerName}.png`
                    : this.state.markerImageFile.name}
              </LabelFile>
              <HideInput
                type="file"
                id="file"
                name="markerImage"
                onChange={e => this.onChange(e)}
              />
              {this.state.markerImageFileError && (
                <ErrorMessage>{this.state.markerImageFileError}</ErrorMessage>
              )}
            </FormGroup>
            {this.state.uploadStatus ? (
              <FormGroup>
                <SubmitBtn>
                  {this.props.selectedMarker.id &&
                  !this.props.selectedMarker.isDeleted
                    ? "Edit Marker"
                    : "Upload new marker"}
                </SubmitBtn>
                {this.props.selectedMarker.id &&
                !this.props.selectedMarker.isDeleted ? (
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
