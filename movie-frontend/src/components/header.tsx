import Nav from "./navigation";
import "../css/header.css";
type FormProps = {
	howitworks: React.RefObject<HTMLDivElement>;
	movie: React.RefObject<HTMLDivElement>;
};
function Header({ howitworks, movie }: FormProps) {
	return (
		<header>
			<Nav howitworks={howitworks} movie={movie}></Nav>
			<div className="hero">
				<h1>Discover and explore a world of movies at your fingertips.</h1>
				<p>
					Welcome moviradar the palce where you can Explore, Discover, and Dive
					into the world of movies With our powerful movie search feature, you
					can easily find your favorite movies by title and explore a vast
					collection of cinematic wonders.
				</p>
			</div>
		</header>
	);
}
export default Header;
