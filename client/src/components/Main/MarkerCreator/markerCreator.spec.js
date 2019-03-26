import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import configureStore from "redux-mock-store";
import { MarkerCreator } from "./MarkerCreator";

let domtoimage = require("dom-to-image");

describe("marker creator component", () => {
  let wrapper;

  it("passess all props to markerCreator component", () => {
    const postMarker = jest.fn();
    const removeMarker = jest.fn();
    const editMarker = jest.fn();
    const getSelectedMarker = jest.fn();
    const fetchMarkers = jest.fn();
    const selectedMarker = {
      icon: "1548784752159.png",
      id: 1,
      name: "test1",
      userId: 1
    };
    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];

    wrapper = shallow(
      <MarkerCreator
        markers={markers}
        selectedMarker={selectedMarker}
        getSelectedMarker={getSelectedMarker}
        editMarker={editMarker}
        postMarker={postMarker}
        removeMarker={removeMarker}
        fetchMarkers={fetchMarkers}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("componentDidMount", () => {
    const postMarker = jest.fn();
    const removeMarker = jest.fn();
    const editMarker = jest.fn();
    const getSelectedMarker = jest.fn();
    const fetchMarkers = jest.fn();
    const selectedMarker = {
      id: 1,
      name: "test1",
      icon: "1548784752159.png",
      userId: 1,
      url: "http://localhost:8080/images/1552937459493.png"
    };
    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];

    wrapper = shallow(
      <MarkerCreator
        markers={markers}
        selectedMarker={selectedMarker}
        getSelectedMarker={getSelectedMarker}
        editMarker={editMarker}
        postMarker={postMarker}
        removeMarker={removeMarker}
        fetchMarkers={fetchMarkers}
      />
    );

    expect(fetchMarkers).toHaveBeenCalledTimes(1);
  });

  it("componentDidUpdate", () => {
    const postMarker = jest.fn();
    const removeMarker = jest.fn();
    const editMarker = jest.fn();
    const getSelectedMarker = jest.fn();
    const fetchMarkers = jest.fn();
    const selectedMarker = {
      icon: "1548784752159.png",
      id: 1,
      name: "test1",
      userId: 1
    };
    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];

    wrapper = shallow(
      <MarkerCreator
        markers={markers}
        selectedMarker={selectedMarker}
        getSelectedMarker={getSelectedMarker}
        editMarker={editMarker}
        postMarker={postMarker}
        removeMarker={removeMarker}
        fetchMarkers={fetchMarkers}
      />
    );

    const SelectedNewMarker = {
      icon: "1550173679016.png",
      id: 2,
      name: "basen",
      userId: 1,
      url: "http://localhost:8080/images/1550173679016.png"
    };
    wrapper.setProps({
      selectedMarker: SelectedNewMarker
    });

    expect(wrapper.state().markerName).toEqual(SelectedNewMarker.name);
    expect(wrapper.state().displaySelectedImage).toEqual(SelectedNewMarker.url);
    expect(wrapper.state().markerImageFile).toEqual("");
  });

  it("on change", () => {
    const postMarker = jest.fn();
    const removeMarker = jest.fn();
    const editMarker = jest.fn();
    const getSelectedMarker = jest.fn();
    const fetchMarkers = jest.fn();
    const selectedMarker = {
      icon: "1548784752159.png",
      id: 1,
      name: "test1",
      userId: 1
    };
    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];

    wrapper = shallow(
      <MarkerCreator
        markers={markers}
        selectedMarker={selectedMarker}
        getSelectedMarker={getSelectedMarker}
        editMarker={editMarker}
        postMarker={postMarker}
        removeMarker={removeMarker}
        fetchMarkers={fetchMarkers}
      />
    );

    const markerInput = wrapper.find("input").first();
    const fileInput = wrapper.find("input").at(1);
    const file = {
      name: "someFile.png"
    };

    global.URL.createObjectURL = jest.fn(() => "details");

    wrapper.setState({
      markerNameError: "someError",
      markerImageFileError: "someError2"
    });

    markerInput.simulate("change", {
      target: {
        name: "markerName",
        value: "test1"
      }
    });

    fileInput.simulate("change", {
      target: {
        name: "markerImage",
        files: [file]
      }
    });

    expect(file.name).toMatch(/\.(png)$/i);
    expect(wrapper.state().markerNameError).toEqual("");
    expect(wrapper.state().markerImageFileError).toEqual("");
    expect(wrapper.state().markerName).toEqual("test1");
    expect(wrapper.state().markerImageFile.name).toEqual("someFile.png");
  });

  it("marker success sending", () => {
    const postMarker = jest.fn();
    const removeMarker = jest.fn();
    const editMarker = jest.fn();
    const getSelectedMarker = jest.fn();
    const fetchMarkers = jest.fn();
    const selectedMarker = "";
    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];

    wrapper = shallow(
      <MarkerCreator
        markers={markers}
        selectedMarker={selectedMarker}
        getSelectedMarker={getSelectedMarker}
        editMarker={editMarker}
        postMarker={postMarker}
        removeMarker={removeMarker}
        fetchMarkers={fetchMarkers}
      />
    );

    wrapper.setState({
      markerName: "test11",
      markerImageFile: {
        name: "someFile.png"
      }
    });

    const form = wrapper.find("form");

    form.simulate("submit", { preventDefault() {} });

    expect(wrapper.state().markerNameError).toBe("");
    expect(wrapper.state().markerImageFileError).toBe("");
  });

  it("marker failure sending - wrong file format", () => {
    const postMarker = jest.fn();
    const removeMarker = jest.fn();
    const editMarker = jest.fn();
    const getSelectedMarker = jest.fn();
    const fetchMarkers = jest.fn();
    const selectedMarker = "";
    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];

    wrapper = shallow(
      <MarkerCreator
        markers={markers}
        selectedMarker={selectedMarker}
        getSelectedMarker={getSelectedMarker}
        editMarker={editMarker}
        postMarker={postMarker}
        removeMarker={removeMarker}
        fetchMarkers={fetchMarkers}
      />
    );

    wrapper.setState({
      markerName: "test11",
      markerImageFile: {
        name: "someFile"
      }
    });

    const form = wrapper.find("form");

    form.simulate("submit", { preventDefault() {} });

    expect(wrapper.state().markerImageFileError).toBe("Format must be .png");
  });

  it("marker failure sending - without image file and marker name", () => {
    const postMarker = jest.fn();
    const removeMarker = jest.fn();
    const editMarker = jest.fn();
    const getSelectedMarker = jest.fn();
    const fetchMarkers = jest.fn();
    const selectedMarker = "";
    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];

    wrapper = shallow(
      <MarkerCreator
        markers={markers}
        selectedMarker={selectedMarker}
        getSelectedMarker={getSelectedMarker}
        editMarker={editMarker}
        postMarker={postMarker}
        removeMarker={removeMarker}
        fetchMarkers={fetchMarkers}
      />
    );

    wrapper.setState({});

    const form = wrapper.find("form");

    form.simulate("submit", { preventDefault() {} });

    expect(wrapper.state().markerNameError).toBe(
      "Username needs to be atleast 3 characters long"
    );
    expect(wrapper.state().markerImageFileError).toBe(
      "Input file cannot be empty"
    );
  });

  it("marker failure sending - too short marker name", () => {
    const postMarker = jest.fn();
    const removeMarker = jest.fn();
    const editMarker = jest.fn();
    const getSelectedMarker = jest.fn();
    const fetchMarkers = jest.fn();
    const selectedMarker = "";
    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];

    wrapper = shallow(
      <MarkerCreator
        markers={markers}
        selectedMarker={selectedMarker}
        getSelectedMarker={getSelectedMarker}
        editMarker={editMarker}
        postMarker={postMarker}
        removeMarker={removeMarker}
        fetchMarkers={fetchMarkers}
      />
    );

    wrapper.setState({
      markerName: "t1",
      markerImageFile: {
        name: "someFile.png"
      }
    });

    const form = wrapper.find("form");

    form.simulate("submit", { preventDefault() {} });

    expect(wrapper.state().markerNameError).toBe(
      "Username needs to be atleast 3 characters long"
    );
  });

  it("marker failure sending - this marker name is exist", () => {
    const postMarker = jest.fn();
    const removeMarker = jest.fn();
    const editMarker = jest.fn();
    const getSelectedMarker = jest.fn();
    const fetchMarkers = jest.fn();
    const selectedMarker = "";
    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];

    wrapper = shallow(
      <MarkerCreator
        markers={markers}
        selectedMarker={selectedMarker}
        getSelectedMarker={getSelectedMarker}
        editMarker={editMarker}
        postMarker={postMarker}
        removeMarker={removeMarker}
        fetchMarkers={fetchMarkers}
      />
    );

    wrapper.setState({
      markerName: "test1",
      markerImageFile: {
        name: "someFile"
      }
    });

    const form = wrapper.find("form");

    form.simulate("submit", { preventDefault() {} });
    expect(wrapper.state().markerNameError).toBe(
      "This marker is already exist"
    );
  });

  it("edit marker success - change only marker name", () => {
    const postMarker = jest.fn();
    const removeMarker = jest.fn();
    const editMarker = jest.fn();
    const getSelectedMarker = jest.fn();
    const fetchMarkers = jest.fn();
    const selectedMarker = {
      icon: "1548784752159.png",
      id: 1,
      name: "test1",
      userId: 1,
      url: "http://localhost:8080/images/1548784752159.png"
    };

    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];

    wrapper = shallow(
      <MarkerCreator
        markers={markers}
        selectedMarker={selectedMarker}
        getSelectedMarker={getSelectedMarker}
        editMarker={editMarker}
        postMarker={postMarker}
        removeMarker={removeMarker}
        fetchMarkers={fetchMarkers}
      />
    );

    wrapper.setState({
      markerName: "editedName"
    });

    const form = wrapper.find("form");
    form.simulate("submit", { preventDefault() {} });

    expect(wrapper.state().markerNameError).toBe("");
    expect(wrapper.state().markerImageFileError).toBe("");
  });

  it("edit marker success - change marker name and image", () => {
    const postMarker = jest.fn();
    const removeMarker = jest.fn();
    const editMarker = jest.fn();
    const getSelectedMarker = jest.fn();
    const fetchMarkers = jest.fn();
    const selectedMarker = {
      icon: "1548784752159.png",
      id: 1,
      name: "test1",
      userId: 1,
      url: "http://localhost:8080/images/1548784752159.png"
    };

    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];

    wrapper = shallow(
      <MarkerCreator
        markers={markers}
        selectedMarker={selectedMarker}
        getSelectedMarker={getSelectedMarker}
        editMarker={editMarker}
        postMarker={postMarker}
        removeMarker={removeMarker}
        fetchMarkers={fetchMarkers}
      />
    );

    wrapper.setState({
      markerName: "editedName",
      markerImageFile: {
        name: "someFile.png"
      }
    });

    const form = wrapper.find("form");
    form.simulate("submit", { preventDefault() {} });

    expect(wrapper.state().markerNameError).toBe("");
    expect(wrapper.state().markerImageFileError).toBe("");
  });

  it("remove marker", () => {
    const postMarker = jest.fn();
    const removeMarker = jest.fn();
    const editMarker = jest.fn();
    const getSelectedMarker = jest.fn();
    const fetchMarkers = jest.fn();
    const selectedMarker = {
      icon: "1548784752159.png",
      id: 1,
      name: "test1",
      userId: 1,
      url: "http://localhost:8080/images/1548784752159.png"
    };
    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];

    wrapper = shallow(
      <MarkerCreator
        markers={markers}
        selectedMarker={selectedMarker}
        getSelectedMarker={getSelectedMarker}
        editMarker={editMarker}
        postMarker={postMarker}
        removeMarker={removeMarker}
        fetchMarkers={fetchMarkers}
      />
    );

    wrapper.setState({
      markerName: "test1",
      markerImageFile: {
        name: "1548784752159.png"
      }
    });

    const removeBtn = wrapper.find("button").at(3);
    removeBtn.simulate("click");

    expect(wrapper.instance().state.markerName).toBe("");
    expect(wrapper.instance().state.markerImageFile).toBe("");
    expect(wrapper.instance().state.displaySelectedImage).toBe(
      "IMG-default.png"
    );
    expect(removeMarker).toHaveBeenCalledTimes(1);
    expect(getSelectedMarker).toHaveBeenCalledTimes(1);
  });
  it("change upload interface to custom", () => {
    const postMarker = jest.fn();
    const removeMarker = jest.fn();
    const editMarker = jest.fn();
    const getSelectedMarker = jest.fn();
    const fetchMarkers = jest.fn();
    const selectedMarker = {
      icon: "1548784752159.png",
      id: 1,
      name: "test1",
      userId: 1,
      url: "http://localhost:8080/images/1548784752159.png"
    };
    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];

    wrapper = shallow(
      <MarkerCreator
        markers={markers}
        selectedMarker={selectedMarker}
        getSelectedMarker={getSelectedMarker}
        editMarker={editMarker}
        postMarker={postMarker}
        removeMarker={removeMarker}
        fetchMarkers={fetchMarkers}
      />
    );

    const customBtn = wrapper.find("button").at(1);
    customBtn.simulate("click");
    expect(wrapper.instance().state.uploadStatus).toBe(false);
  });

  it("change custom interface to upload", () => {
    const postMarker = jest.fn();
    const removeMarker = jest.fn();
    const editMarker = jest.fn();
    const getSelectedMarker = jest.fn();
    const fetchMarkers = jest.fn();
    const selectedMarker = {
      icon: "1548784752159.png",
      id: 1,
      name: "test1",
      userId: 1,
      url: "http://localhost:8080/images/1548784752159.png"
    };
    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];

    wrapper = shallow(
      <MarkerCreator
        markers={markers}
        selectedMarker={selectedMarker}
        getSelectedMarker={getSelectedMarker}
        editMarker={editMarker}
        postMarker={postMarker}
        removeMarker={removeMarker}
        fetchMarkers={fetchMarkers}
      />
    );

    wrapper.setState({
      uploadStatus: false
    });
    const customBtn = wrapper.find("button").at(0);
    customBtn.simulate("click");

    expect(wrapper.instance().state.uploadStatus).toBe(true);
  });

  it("download image - success", () => {
    const postMarker = jest.fn();
    const removeMarker = jest.fn();
    const editMarker = jest.fn();
    const getSelectedMarker = jest.fn();
    const fetchMarkers = jest.fn();
    const selectedMarker = {
      icon: "1548784752159.png",
      id: 1,
      name: "test1",
      userId: 1,
      url: "http://localhost:8080/images/1548784752159.png"
    };
    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];

    wrapper = shallow(
      <MarkerCreator
        markers={markers}
        selectedMarker={selectedMarker}
        getSelectedMarker={getSelectedMarker}
        editMarker={editMarker}
        postMarker={postMarker}
        removeMarker={removeMarker}
        fetchMarkers={fetchMarkers}
      />
    );

    wrapper.setState({
      uploadStatus: false,
      markerName: "test1"
    });

    const DownloadBtn = wrapper.find("button").at(2);

    domtoimage.toPng = jest.fn(arg => {
      let promise = new Promise((resolve, reject) => {
        resolve("myblob");
      });
      return promise;
    });

    DownloadBtn.simulate("click");

    expect(domtoimage.toPng).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().state.markerNameError).toBe("");
    expect(wrapper.instance().state.markerImageFile).toBe("");
  });

  it("download image - failure", () => {
    const postMarker = jest.fn();
    const removeMarker = jest.fn();
    const editMarker = jest.fn();
    const getSelectedMarker = jest.fn();
    const fetchMarkers = jest.fn();
    const selectedMarker = {
      icon: "1548784752159.png",
      id: 1,
      name: "test1",
      userId: 1,
      url: "http://localhost:8080/images/1548784752159.png"
    };
    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];

    wrapper = shallow(
      <MarkerCreator
        markers={markers}
        selectedMarker={selectedMarker}
        getSelectedMarker={getSelectedMarker}
        editMarker={editMarker}
        postMarker={postMarker}
        removeMarker={removeMarker}
        fetchMarkers={fetchMarkers}
      />
    );

    wrapper.setState({
      uploadStatus: false,
      markerName: "t1"
    });

    const DownloadBtn = wrapper.find("button").at(2);

    const mockFn = jest.fn(arg => {
      let promise = new Promise((resolve, reject) => {
        resolve("myblob");
      });
      return promise;
    });

    domtoimage.toPng = mockFn;

    DownloadBtn.simulate("click");

    expect(mockFn).toHaveBeenCalledTimes(0);
    expect(wrapper.instance().state.markerNameError).toBe(
      "Username needs to be atleast 3 characters long"
    );
    expect(wrapper.instance().state.markerImageFile).toBe("");
  });

  it("imageBox - ref", () => {
    const postMarker = jest.fn();
    const removeMarker = jest.fn();
    const editMarker = jest.fn();
    const getSelectedMarker = jest.fn();
    const fetchMarkers = jest.fn();
    const selectedMarker = {
      icon: "1548784752159.png",
      id: 1,
      name: "test1",
      userId: 1,
      url: "http://localhost:8080/images/1548784752159.png"
    };
    const markers = [
      {
        icon: "1548784752159.png",
        id: 1,
        name: "test1",
        userId: 1
      },
      {
        icon: "1550173679016.png",
        id: 2,
        name: "basen",
        userId: 1
      }
    ];

    wrapper = mount(
      <MarkerCreator
        markers={markers}
        selectedMarker={selectedMarker}
        getSelectedMarker={getSelectedMarker}
        editMarker={editMarker}
        postMarker={postMarker}
        removeMarker={removeMarker}
        fetchMarkers={fetchMarkers}
      />
    );
    wrapper.setState({
      uploadStatus: false
    });

    expect(wrapper.instance().imageBox).toBeTruthy();
    expect(wrapper.instance().inputFile).toBeTruthy();
  });
});
