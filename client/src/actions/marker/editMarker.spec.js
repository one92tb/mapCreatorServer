import * as actions from "./editMarker";
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import LocalStorageMock from "../../../mocks/localStorageMock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

global.localStorage = new LocalStorageMock();

const marker = {
  id: 1,
  markerName: "1",
  icon: "1.png",
  userId: 1
};

const editedMarker = {
  id: 1,
  markerName: "11",
  icon: "1.png",
  userId: 1
};

const expectedResult = editedMarker;

const mock = new MockAdapter(axios);
let store = mockStore();

describe("editMarker actions", () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it("EDITED_MARKER_SUCCESS", () => {
    mock
      .onPut(`http://46.101.186.181:8080/markers/1`)
      .reply(200, expectedResult);
    store.dispatch(actions.editMarker(marker, 1)).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: actions.EDITING_MARKER
        },
        {
          type: actions.EDITED_MARKER_SUCCESS,
          marker: editedMarker
        }
      ]);
    });
  });

  it("EDITED_MARKER_ERROR", () => {
    mock.onPut("http://46.101.186.181:8080/markers").reply(404);
    store.dispatch(actions.editMarker(marker)).then(() => {
      expect(store.getActions()[0].type).toEqual(actions.EDITING_MARKER);
      expect(store.getActions()[1].type).toEqual(actions.EDITED_MARKER_ERROR);
    });
  });
});
