import React from "react";

function VisitListCard(props) {
	return (
		<>
			<div className="visitListCard">
				<p>Address: {props.building.building.address}</p>
				<p>Original Use: {props.building.building.original_use}</p>
				<p>Build Date: {props.building.building.build_date}</p>
				<p>Historical District: {props.building.building.historical_district}</p>
			</div>
		</>
	);
}

export default VisitListCard;
