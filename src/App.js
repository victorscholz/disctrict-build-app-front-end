import Map from "./Map";
import React from "react";
import "./App.css";
import VisitList from "./VisitList";

const railsUrl = "http://localhost:3000/visit_lists";
// id = currentUser
// railsUrl + ${id}

class App extends React.Component {
	state = {
		// userArray: [],
		visitListArray: [],
		menuClicked: false,
	};

	componentDidMount = () => {
		fetch(railsUrl)
			.then((resp) => resp.json())
			.then((data) => this.setState(() => ({ visitListArray: data })));
	};

	// this.setState({ menuClicked: !this.state.menuClicked })

	changeMenuState = () => {
		this.setState(() => ({ menuClicked: !this.state.menuClicked }));
	};

	newUser = (e) => {
		fetch("http://localhost:3000/visit_lists/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				name: e.target.value,
				password: e.target.value,
			}),
		});
	};

	addToVisitList = () => {
		return console.log("Added to Visit List");
	};

	render = () => {
		return (
			<>
				<VisitList
					changeMenuState={this.changeMenuState}
					menuClicked={this.state.menuClicked}
					visitListArray={this.state.visitListArray}
				/>
				<Map addToVisitList={this.addToVisitList} />
			</>
		);
	};
}

export default App;
