import * as actions from "./removeMarker";
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import LocalStorageMock from "../../../mocks/localStorageMock";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

global.localStorage = new LocalStorageMock();

const mock = new MockAdapter(axios);
let store = mockStore();
const id = 1;
const expectedResult = { id };

describe("removeMarker actions", () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it("REMOVED_MARKER_SUCCESS", () => {
    mock
      .onDelete(`http://46.101.186.181:8080/markers/1`)
      .reply(200, expectedResult);
    store.dispatch(actions.removeMarker(1)).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: actions.REMOVING_MARKER
        },
        {
          type: actions.REMOVED_MARKER_SUCCESS,
          id
        }
      ]);
    });
  });

  it("REMOVED_MARKER_ERROR", () => {
    mock.onDelete(`http://46.101.186.181:8080/markers/1`).reply(404);
    store.dispatch(actions.removeMarker(1)).then(() => {
      expect(store.getActions()[0].type).toEqual(actions.REMOVING_MARKER);
      expect(store.getActions()[1].type).toEqual(actions.REMOVED_MARKER_ERROR);
    });
  });
});
