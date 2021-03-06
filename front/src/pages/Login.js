import React from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import Button from "react-bootstrap/Button";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			username: "",
			password: "",
		};
	}

	handleOnChange(event) {
		const name = event.target.name;
		const value = event.target.value;

		this.setState({
			[name]: value,
		});
	}

	handleOnSubmit(event) {
		event.preventDefault();
		// TODO: handle submission info
	}

	componentDidMount() {
		const cookies = new Cookies();
		const token = cookies.get("pwLoggedIn");
		if (token !== undefined && token !== null && token !== "") {
			this.setState({
				loggedIn: true,
			});
		} else {
			this.setState({
				loggedIn: false,
			});
		}
	}

	render() {
		if (this.state.loggedIn) {
			return (<Redirect to={"/"} />);
		} else {
			return (
				<Container>
					<Row>
						<Col className={"my-4"} lg={"12"}>
							<h1>Sign In</h1>
						</Col>
					</Row>
					<Form onSubmit={(e) => this.handleOnSubmit(e)}>
						<Form.Row>
							<Form.Group controlId={"formUsername"}>
								<Form.Label>Username: </Form.Label>
								<Form.Control
									as={"input"}
									type={"text"}
									name={"username"}
									value={this.state.username}
									onChange={(e) => this.handleOnChange(e)} />
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group controlId={"formPassword"}>
								<Form.Label>Password: </Form.Label>
								<Form.Control
									as={"input"}
									type={"password"}
									name={"password"}
									value={this.state.password}
									onChange={(e) => this.handleOnChange(e)} />
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Button variant={"primary"} type={"submit"}>Submit</Button>
						</Form.Row>
					</Form>
				</Container>
			);
		}
	}
}

export default Login;
