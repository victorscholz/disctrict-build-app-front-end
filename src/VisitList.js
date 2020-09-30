import React from "react";
import VisitListCard from "./VisitListCard";

function VisitList(props) {
	const districtBuildButton = <h2>DistrictBuild NYC</h2>;

	const visitListCards = props.visitListArray.map((building) => (
		// function can't iterate through nested data
		// works for non nested data
		// find a way to map through content arrays
		<VisitListCard key={building.id} building={building} />
	));

	return (
		<div
			className={props.menuClicked ? "visitList" : "sidebarStyle"}
			onClick={props.changeMenuState}
		>
			{props.menuClicked ? visitListCards : districtBuildButton}
		</div>
	);
}

export default VisitList;
