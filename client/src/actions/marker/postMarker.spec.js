import * as actions from "./postMarker";
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

const marker = {
  id: 0,
  markerName: "1",
  icon: "1.png",
  userId: 1
};

const error = [{ message: "spierdolone" }];
const mock = new MockAdapter(axios);
let store = mockStore();

describe("getPosts actions", () => {
  afterEach(() => {
    mock.reset();
  });

/*  it("POSTED_MARKER_SUCCESS", () => {
    mock.onPost("http://46.101.186.181:8080/markers").reply(200, marker);
    store.dispatch(actions.postMarker(marker)).then(() => {
      console.log(store.getActions());

      expect(store.getActions()[0].type).toEqual(actions.POSTING_MARKER);
      expect(store.getActions()[1]).toEqual({
        type: actions.POSTED_MARKER_SUCCESS,
        marker: marker
      });
    });
  });*/

  it("error", () => {
    mock.onPost("http://46.101.186.181:8080/markers").reply(404);
    store.dispatch(actions.postMarker(marker)).catch(() => {
      console.log(store.getActions());
          expect(5).toBe(4);
      //  expect(store.getActions()[0].type).toEqual(actions.POSTING_MARKER);
      //  expect(store.getActions()[1].type).toEqual(actions.POSTED_MARKER_ERROR);
    });
  });
});
/*    return axios
  .post("http://46.101.186.181:8080/markers", marker)
  .catch(error => {
    console.log(error);
    console.log(store.getActions());
    expect(error.response.status).toBe(405);
  });*/
