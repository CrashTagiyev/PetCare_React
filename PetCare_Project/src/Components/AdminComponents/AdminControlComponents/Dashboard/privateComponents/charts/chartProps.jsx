export const monthlyPetProps = (data) => {
  const props = {
    data: data,
    xField: "yearMonth",
    yField: "count",
    width: 400,
    height: 300,
    colorField:"red",
    tooltip: {
      showMarkers: false,
      title: "yearMonth",
      formatter: (datum) => {
        return {
          name: datum.x,
          value: datum.y,
        };
      },
    },
    interactions: [{ type: "element-active" }],
  };
  return props;
};
export const monthlyVetProps = (data) => {
  const props = {
    data: data,
    xField: "yearMonth",
    yField: "count",
    width: 400,
    height: 300,
    colorField:"orange",
    tooltip: {
      showMarkers: false,
      title: "yearMonth",
      formatter: (datum) => {
        return {
          name: datum.x,
          value: datum.y,
        };
      },
    },
    interactions: [{ type: "element-active" }],
  };
  return props;
};
export const monthlyCompanyProps = (data) => {
  const props = {
    data: data,
    xField: "yearMonth",
    yField: "count",
    width: 400,
    height: 300,
    colorField:"green",
    tooltip: {
      showMarkers: false,
      title: "yearMonth",
      formatter: (datum) => {
        return {
          name: datum.x,
          value: datum.y,
        };
      },
    },
    interactions: [{ type: "element-active" }],
  };
  return props;
};
export const monthlyUserProps = (data) => {
  const props = {
    data: data,
    xField: "yearMonth",
    yField: "count",
        width:300,
    height: 300,
    colorField:"red",
    tooltip: {
      showMarkers: false,
      title: "yearMonth",
      formatter: (datum) => {
        return {
          name: datum.x,
          value: datum.y,
        };
      },
    },
    interactions: [{ type: "element-active" }],
  };
  return props;
};
