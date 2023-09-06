import "../css/how.css";
import { Ref, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./authContext";

import Footer from "./footer";
type FormProps = {
	howitworks: React.RefObject<HTMLDivElement>;
};
function How({ howitworks }: FormProps) {
	const { token } = useAuth();
	return (
		<div className="howitworks" ref={howitworks}>
			<h2 className="works">how it works</h2>
			<h2 className="works-motivatin">
				{" "}
				Your Daily Dose of Cinema Magic in 3 Simple Steps
			</h2>

			<div className="grid-how">
				<div className="step">
					<p className="numbers">01</p>
					<img src="./images/signup.png" alt="" />
					<div className="desc">
						<p>
							Create account with your email and a secure password.Your gateway
							to personalized movie searches.
						</p>
					</div>
				</div>
				<div className="step">
					<p className="numbers">02</p>
					<img src="./images/authe.jpg" alt="" />
					<div className="desc">
						<p>
							Log in securely with your registered credentials. Our encryption
							ensures your privacy.
						</p>
					</div>
				</div>
				<div className="step">
					<p className="numbers">03</p>
					<img src="./images/serach1.jpg" alt="" />
					<div className="desc">
						<p>
							Effortlessly search by title. Browse, explore, and enjoy trailers
							and details. All at your fingertips!
						</p>
					</div>
				</div>
			</div>
			<p className="expreience">
				EXPERIENCE THE NEXT LEVEL OF MOVIE SEARCHE WITH MOVIERADAR!
			</p>

			<Link to={`${token ? "/searchmovies" : "/signup"}`} className="get">
				Get Started
			</Link>
			<Footer />
		</div>
	);
}
export default How;
