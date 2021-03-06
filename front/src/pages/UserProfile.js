import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {Redirect} from "react-router-dom";
import "../css/user-profile.css";
import { Container, Row, Col } from "react-bootstrap";

class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			token: null,
			validUser: null,
		};
	}

	componentDidMount() {
		// After user login, we will save his or her id, also called token, to cookies so that other pages could recognize user's identity.
		// Load user's token from cookies since we need to know who is visiting this website.
		// If we load user's token successfully, fetch user's profile from backend.
		// Otherwise, by setting validUser to false, we force user jump to login page.
		const cookies = new Cookies();
		const token = cookies.get("pwLoggedIn");
		if (token === undefined || token === null || token === "") {
			this.setState({
				validUser: false,
			});
		} else {
			axios.get("/users/fetchUser", {
				params: {
					token: token,
				}
			}).then((response) => {
				console.log(response);
				this.setState({
					email: response.data.email,
					username: response.data.username,
					validUser: true,
				});
			});
		}
	}

	renderProfile() {
		let greetingsInfo = null;
		if (this.state.username !== undefined && this.state.username !== null && this.state.username !== "") {
			greetingsInfo = (<h1>Hello {this.state.username}! </h1>);
		}
		return (
			<Container>
				<Row>
					<Col lg={"3"}>
						<img className={"avatar"} src={"images/avatar.svg"} alt="" />
					</Col>
					<Col lg={"9"}>
						{greetingsInfo}
					</Col>
				</Row>
			</Container>
		);
	}

	render() {
		if (this.state.validUser === false) {
			return (<Redirect to={"/login"}/>);
		} else {
			return this.renderProfile();
		}
	}
}

export default UserProfile;
