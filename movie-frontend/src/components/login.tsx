import Footer from "./footer";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { useAuth } from "./authContext";
function Login() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setAuthToken } = useAuth();
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
		await fetch("http://127.0.0.1:5000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				if (!data) {
					navigate("/userunknwon");
					return;
				}
				setAuthToken(data);
				navigate("/searchmovies", { replace: true });
			})
			.catch((error) => {
				console.log(error);
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
				<FaUserCircle className="icon" />
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
							Login
						</button>
					</div>
					<div>
						<a href="forget1.html" className="forget">
							foreget password?
						</a>
						<h5>
							Don't have an account?
							<Link to={"/signup"} className="create">
								create new
							</Link>
						</h5>
					</div>
				</form>
			</div>
			<Footer></Footer>
		</div>
	);
}
export default Login;
