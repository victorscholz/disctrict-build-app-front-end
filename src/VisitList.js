import React, { useState, useEffect } from "react";
import VisitListCard from "./VisitListCard";

function VisitList(props) {
  const districtBuildButton = <h2>DistrictBuild NYC</h2>;
  const [hovered, setHover] = useState(false);
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  const visitListCards = props.visitListArray.map((building) => (
    <VisitListCard
      key={building.id}
      building={building}
      deleteBuilding={props.deleteBuilding}
    />
  ));

  return (
    <div
      onPointerOver={(e) => {
        setHover(true);
      }}
      onPointerOut={(e) => {
        setHover(false);
      }}
      onClick={props.changeHistoryState}
      // onMouseLeave={props.changeHistoryState}
      className={props.historyClicked ? "visitList" : "sidebarStyle"}
    >
      {props.historyClicked ? <strong>View History</strong> : null}

      <div>{props.historyClicked ? visitListCards : districtBuildButton}</div>
    </div>
  );
}

export default VisitList;
