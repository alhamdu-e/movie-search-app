import { Link, useNavigate } from "react-router-dom";
import "../css/navagiation.css";

import { useAuth } from "./authContext";
type FormProps = {
	howitworks: React.RefObject<HTMLDivElement>;
	movie: React.RefObject<HTMLDivElement>;
};
function Nav({ howitworks, movie }: FormProps) {
	const { token, setAuthToken } = useAuth();
	const navigate = useNavigate();

	const howwork = () => {
		if (howitworks.current) {
			window.scrollTo({
				top: howitworks.current.offsetTop,
				behavior: "smooth",
			});
		}
	};
	const featuer = () => {
		if (movie.current) {
			window.scrollTo({
				top: movie.current.offsetTop,
				behavior: "smooth",
			});
		}
	};
	return (
		<div className="nav-container">
			<div className="logo-cont">
				<img src="./images/logo6.png" alt="logo" className="logo" />{" "}
				<span>movieradar</span>
			</div>

			<nav>
				<ul className="nav-list">
					<li>
						<a href="#" onClick={featuer}>
							popular movie
						</a>
					</li>
					<li>
						<a href="#" onClick={howwork}>
							how it works
						</a>
					</li>
					<li>
						<Link
							to={`${token ? "" : "/signup"}`}
							onClick={() => {
								if (token) {
									setAuthToken("");
									navigate("/");
									return;
								}
							}}>
							{" "}
							{`${token ? "logout" : "Login"}`}
						</Link>
					</li>
					<li>
						<Link
							to={`${token ? "/searchmovies" : "/signup"}`}
							className="tryit">
							{" "}
							{`${token ? "Search movie" : "try for free"}`}
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Nav;
