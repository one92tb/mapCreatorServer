export const disableMarkers = markers => {
  console.log(markers);
  return {
    type: "MARKERS_TO_DISABLE",
    markers
  };
};
