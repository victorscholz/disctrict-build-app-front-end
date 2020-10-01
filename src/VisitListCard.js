import React from "react";

function VisitListCard(props) {
	// {debugger}
	return (
		<>
			<div className="visitListCard">
				<h3 className="vlCard-title" align="center">
					{props.building.build_nme === "0"
						? "Landmark"
						: props.building.build_nme}{" "}
				</h3>
				<p>
					<strong>Borough: </strong> {props.building.borough}
				</p>
				<p>
					<strong>Address: </strong> {props.building.des_addres}
				</p>
				<p>
					<strong>Original Use: </strong> {props.building.use_orig}
				</p>
				<p>
					<strong>Build Date: </strong> {props.building.date_combo}
				</p>
				<p>
					<strong>District: </strong>
					{props.building.hist_dist}
				</p>
				<p>
					{" "}
					<button
						className="delete-button"
						onClick={() => props.deleteBuilding(props.building)}
					>
						{" "}
						Delete{" "}
						{props.building.build_nme === "0"
							? "This Landmark"
							: props.building.build_nme}{" "}
						From History{" "}
					</button>{" "}
				</p>
			</div>
		</>
	);
}

export default VisitListCard;
