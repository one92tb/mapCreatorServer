import React, { Component } from "react";
import { postRecord } from "../../actions/postRecord";
import { getSelectedMarker } from "../../actions/getSelectedMarker";
import { removeRecord } from "../../actions/removeRecord";
import { editRecord } from "../../actions/editRecord";
import { connect } from "react-redux";
import styled from "styled-components";
import { css } from "styled-components";

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

const Image = styled.img`
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

const Input = css`
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
`;

const InputName = css`
  display: block;
  width: 100%;
  height: calc(2,25rem + 2px);
  padding: 0.375rem 0.75rem;
  color: #495057
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

const FormItem = styled.input`
  ${Input} ${InputName};
  z-index: -00;
`;

const InputFile = styled.span`
  ${Input} ${Button}
  margin-right: 10px;
  margin-bottom: 0;
  border-color: #00b8e6;
  padding: 6px 12px;
  height: 100%;
  background: #00b8e6;
  height: 38px;
`;

const SubmitBtn = styled.button`
  ${Input} ${Button} ${CrudButton}
  margin-right: 10px;
  background-color: #6c757d;
  border-color: #6c757d;
`;

const RemoveBtn = styled.button`
  ${Input} ${Button} ${CrudButton}
  background-color: #ff6666;
  border-color: #ff6666;
`;

const ImageBox = styled.div`
  border: 1px solid #495057;
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
      if (event.target.files[0]) {
        this.setState({
          markerImageFile: event.target.files[0]
        });
      }
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
    const editRecord = this.props.editRecord;

    let fd = new FormData();

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
      postRecord(fd);

      this.setState({
        markerName: "",
        markerImageFile: "",
        displaySelectedImage: "IMG-default.png"
      });
    }
  };

  removeRecord = () => {
    const isRemoved = this.props.isRemoved;
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

  render() {
    console.log(this.props, this.state);
    return (
      <Wrapper>
        <Inner>
          <ImageBox>
            <Image alt="" src={this.state.displaySelectedImage} />
          </ImageBox>
          <Form onSubmit={this.sendRecord}>
            <FormGroup>
              <LabelName htmlFor="exampleText">Name</LabelName>
              <FormItem
                type="text"
                name="markerName"
                value={this.state.markerName}
                onChange={e => this.onChange(e)}
              />
            </FormGroup>
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
            </FormGroup>
            <SubmitBtn>
              {this.props.selectedMarker.id &&
              !this.props.selectedMarker.isDeleted
                ? "Edit Marker"
                : "Upload new marker"}
            </SubmitBtn>
            {this.props.selectedMarker.id &&
            !this.props.selectedMarker.isDeleted ? (
              <RemoveBtn
                onClick={this.removeRecord}
                type="button"
                color="danger"
                value="remove Marker"
              >
                Remove Marker
              </RemoveBtn>
            ) : (
              ""
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

//  <span className="inputLabel">Chose File to Send</span> {(this.state.displaySelectedImage === 'IMG-default.png') ? 'Not file detected' : (this.props.selectedMarker.id !== undefined) ? `${this.props.selectedMarker.name}.png` : this.state.markerImageFile.name }
//{(this.props.selectedMarker.id !== undefined) ? 'Edit Marker' : 'Upload new marker'}
