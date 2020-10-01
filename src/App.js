import Map from "./Map";
import React from "react";
import "./App.css";

class App extends React.Component {
	// newUser = (e) => {
	// 	fetch(railsUrl, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Accept: "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 			name: e.target.value,
	// 			password: e.target.value,
	// 		}),
	// 	});
	// };

	render = () => {
		return (
			<>
				<Map />
			</>
		);
	};
}

export default App;
