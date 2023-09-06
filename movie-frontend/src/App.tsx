import Header from "./components/header";
import Feature from "./components/feature";
import How from "./components/howitworks";
import Signup from "./components/signup";
import Login from "./components/login";
import Movie from "./components/searchmovie";
import { MovieProvider } from "./components/movecontext";
import MovieDetail from "./components/moviedetails";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/404";
import NotAuth from "./components/notAutheticated";

interface Movie {
	id: Number;
	title: string;
	poster_path: string;
	vote_average: Number;
	release_date: String;
}
const apikey = process.env.REACT_APP_API_KEY;
function App() {
	const howitworks = useRef<HTMLDivElement | null>(null);
	const moviee = useRef<HTMLDivElement | null>(null);

	const [feature, setFeature] = useState<Movie[]>([]);
	useEffect(() => {
		fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + apikey)
			.then((response) => response.json())
			.then((data) => {
				const movies = data.results;
				setFeature(movies);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			<BrowserRouter>
				<MovieProvider>
					<Routes>
						<Route
							path="/"
							element={
								<div>
									<Header howitworks={howitworks} movie={moviee}></Header>
									<div className="feature-container" ref={moviee}>
										{feature
											.filter((movie) => {
												return movie.title.length < 30;
											})
											.slice(0, 15)
											.map((movie) => (
												<Feature
													id={movie.id}
													title={movie.title}
													rating={movie.vote_average}
													year={movie.release_date}
													image={movie.poster_path}
												/>
											))}
									</div>
									<How howitworks={howitworks} />
								</div>
							}></Route>
						<Route path="/login" element={<Login />}></Route>
						<Route path="/signup" element={<Signup />}></Route>
						<Route path="/userunknwon" element={<NotAuth />}></Route>
						<Route path="/moviedetails" element={<MovieDetail />}></Route>
						<Route path="/searchmovies" element={<Movie />}></Route>
						<Route path="*" element={<NotFound />}></Route>{" "}
					</Routes>
				</MovieProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
