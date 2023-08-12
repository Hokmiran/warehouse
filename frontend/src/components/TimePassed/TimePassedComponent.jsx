import React, { useEffect, useState } from "react";

const TimePassedComponent = ({ datetime }) => {
  const [data, setData] = useState("");
  useEffect(() => {
    if (datetime && datetime !== undefined) {
      let d = new Date(datetime);
      let temp = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(d);
      setData(temp);
    }
  }, [datetime]);
  return <span className="epiloge-light">{data}</span>;
};

export default TimePassedComponent;
