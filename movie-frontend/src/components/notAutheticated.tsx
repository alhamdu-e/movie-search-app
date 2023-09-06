import { Link } from "react-router-dom";

function NotAuth() {
	return (
		<div className="center">
			<h1 className="acc">You Are not Registered.Please Register</h1>
			<Link to="/signup" className="accc">
				Registre
			</Link>
		</div>
	);
}
export default NotAuth;
