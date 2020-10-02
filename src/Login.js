import React from "react";

function Login(props) {
	const userUrl = "http://localhost:3000/users/";

	const submitHandler = () => {
		fetch(userUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				accept: "application/json",
			},
			body: JSON.stringify({
				user: props.loginValue,
			})
		})
			.then((resp) => resp.json())
			.then((data) => console.log(data));
	};

	const loginForm = (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				submitHandler();
			}}
		>
			<label>
				<input
					type="text"
					name="login"
					placeholder="Whats ya name???"
					value={props.loginValue}
					onChange={props.loginHandler}
				></input>
			</label>
			<input type="submit" value="login"></input>
		</form>
	);

	// const postUser =

	return (
		<div
			className={props.loginClicked ? "login-form" : "login-button"}
			onMouseEnter={props.changeLoginState}
			onMouseLeave={props.changeLoginState}
		>
			{props.loginClicked ? loginForm : <strong>Log In</strong>}
		</div>
	);
}

export default Login;
