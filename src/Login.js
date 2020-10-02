import React from "react";

function Login(props) {
	const userUrl = "http://localhost:3000/users/";

	const submitHandler = () => {
		let userObj = {
			username: props.loginValue,
			password: props.passwordValue,
		};

		fetch(userUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				accept: "application/json",
			},
			body: JSON.stringify({
				user: userObj,
			}),
		})
			.then((resp) => resp.json())
			.then((data) => {
				props.formReset();
			})
			.then(() => {
				alert("Thanks For Signing In!");
			});
	};

	const loginForm = (
		<div>
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
					<input
						type="text"
						name="login"
						placeholder="Password"
						value={props.passwordValue}
						onChange={props.passwordHandler}
					></input>
				</label>
				<input type="submit" value="login"></input>
			</form>
		</div>
	);


	return (
		<>
			<div
				className={props.loginClicked ? "login-form" : "login-button"}
				onMouseEnter={props.changeLoginState}
				onMouseLeave={props.changeLoginState}
			>
				{props.loginClicked ? loginForm : <strong>Log In</strong>}{" "}
			</div>

		</>
	);
}

export default Login;
