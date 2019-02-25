import * as actions from "./getSelectedMarker";

const marker = {
  id: 1,
  markerName: "1",
  icon: "1.png",
  userId: 1
};

describe("getSelectedMarker action", () => {
  it("getSelectedMarker", () => {
    console.log(actions);
    expect(actions.getSelectedMarker(marker)).toEqual({
      type: actions.GET_SELECTED_MARKER,
      marker
    });
  });
});
