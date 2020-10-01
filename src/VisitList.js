import React from "react";
import VisitListCard from "./VisitListCard";

function VisitList(props) {
	const districtBuildButton = <h2>DistrictBuild NYC</h2>;

	const visitListCards = props.visitListArray.map((building) => (
		<VisitListCard
			key={building.id}
			building={building}
			deleteBuilding={props.deleteBuilding}
		/>
	));

	return (
		<div
			onMouseEnter={props.changeMenuState}
			onMouseLeave={props.changeMenuState}
			className={props.menuClicked ? "visitList" : "sidebarStyle"}
		>
			{props.menuClicked ? "View History" : null}
			<div>
				{props.menuClicked ? visitListCards : districtBuildButton}
			</div>
		</div>
	);
}

export default VisitList;
