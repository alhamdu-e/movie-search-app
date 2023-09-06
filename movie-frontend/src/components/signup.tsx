import Footer from "./footer";
import { BiUserPlus, BiSolidUserPlus } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useState } from "react";
import "../css/login.css";
function Signup() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};
	const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};
	const form = {
		email,
		password,
	};
	const sendForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await fetch("http://127.0.0.1:5000/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form),
		})
			.then((response) => {
				if (response.ok) {
					navigate("/login", { replace: true });
				} else {
					navigate("/signup");
				}
			})
			.catch((error) => {
				console.log("error", error);
			});
	};
	return (
		<div className="login">
			<Link to={"/"}>
				<div className="logo-cont logo-lin">
					<img src="./images/logo6.png" alt="logo" className="logo" />{" "}
					<span>movieradar</span>
				</div>
			</Link>
			<div className="form-cont">
				<BiSolidUserPlus className="icon" />
				<form className="form" onSubmit={sendForm}>
					<div>
						<AiOutlineMail className="in-icon" />{" "}
						<input
							type="email"
							placeholder="email"
							name="email"
							className="input"
							onChange={handleChangeEmail}
						/>
					</div>
					<div>
						<RiLockPasswordLine className="in-icon" />{" "}
						<input
							type="password"
							name="password"
							placeholder="password"
							className="input"
							onChange={handleChangePassword}
						/>
					</div>
					<div>
						{" "}
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<button type="submit" className="login-btn">
							Register
						</button>
					</div>
					<div>
						<a href="#" className="forget">
							Read terms and condition
						</a>
						<h5>
							Don't have an account?
							<Link to={"/login"} className="create">
								Login
							</Link>
						</h5>
					</div>
				</form>
			</div>
			<Footer></Footer>
		</div>
	);
}
export default Signup;
