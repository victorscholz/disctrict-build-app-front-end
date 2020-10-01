import React from "react";

function VisitListCard(props) {
	return (
		<>
			<div className="visitListCard">
				<h2 align="center">
					{props.building.build_nme === "0"
						? "Landmark"
						: props.building.build_nme}{" "}
				</h2>
				<p>Borough: {props.building.borough}</p>
				<p>Address: {props.building.des_addres}</p>
				<p>Original Use: {props.building.use_orig}</p>
				<p>Build Date: {props.building.date_combo}</p>
				<p>Historical District: {props.building.hist_dist}</p>
			</div>
		</>
	);
}

export default VisitListCard;
