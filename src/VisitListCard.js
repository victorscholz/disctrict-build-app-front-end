import React from "react";

function VisitListCard(props) {
	return (
		<>
			<div className="visitListCard">
				<h3 className="vlCard-title" align="center">
					{props.building.build_nme === "0"
						? "Landmark"
						: props.building.build_nme}{" "}
				</h3>
				<p>
					<strong>Borough: </strong>
					<br></br>
					{props.building.borough === "BK"
						? "Brooklyn"
						: props.building.borough === "QN"
						? "Queens"
						: props.building.borough === "MN"
						? "Manhattan"
						: props.building.borough === "BX"
						? "Bronx"
						: props.building.borough === "SI"
						? "Staten Island"
						: "Pizza Rats, I don't know where this is"}
				</p>
				<p>
					<strong>Address: </strong>
					<br></br>
					{props.building.des_addres}
				</p>
				<p>
					<strong>Original Use: </strong>
					<br></br>
					{props.building.use_orig}
				</p>
				<p>
					<strong>Build Date: </strong>
					<br></br>
					{props.building.date_combo}
				</p>
				<p>
					<strong>District: </strong>
					<br></br>
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
