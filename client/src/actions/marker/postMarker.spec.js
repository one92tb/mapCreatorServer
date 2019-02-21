import * as actions from "./postMarker";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import jsonwebtoken from "jsonwebtoken";
import mockData from "./mocks/mockData";
import sinon from "sinon";
import axios from "axios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

const marker = {
  id: 0,
  markerName: "1",
  icon: "1.png",
  userId: 1
};

describe("getPosts actions", () => {
  //  jest.setTimeout(30000);
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it("POSTED_MARKER_SUCCESS", done => {
    moxios.wait(() => {
      const request = moxios.request.mostRecent();
      request.respondWith({
        status: 200,
        data: {
          id: 0,
          markerName: "1",
          icon: "1.png",
          userId: 1
        }
      });
    });

    const expectedActions = [
      { type: actions.POSTING_MARKER },
      {
        type: actions.POSTED_MARKER_SUCCESS,
        marker
      }
    ];
    const store = mockStore({ markers: [] });

    return store.dispatch(actions.postMarker(marker)).then(done => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
