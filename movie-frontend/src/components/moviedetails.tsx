import { useState, useEffect } from "react";
import "../css/moviedetails.css";
import { useMovieContext } from "./movecontext";

import Footer from "./footer";

interface movieTrailerr {
	key: string;
}
interface cast {
	name: string;
}
interface crew {
	name: string;
	job: string;
}

function MovieDetail() {
	const apikey = process.env.REACT_APP_API_KEY;

	const [moviTrailer, setMovieTrailer] = useState<movieTrailerr[]>([]);
	const [Cast, setcast] = useState<cast[]>([]);
	const [crrew, setcrew] = useState<crew[]>([]);

	const {
		selectedMovieId,
		selectedMovieTitle,
		selectedMovieBackdrop,
		selectedMovieYear,
		selectedMovieOverview,
	} = useMovieContext();
	useEffect(() => {
		if (selectedMovieId) {
			fetch(
				"https://api.themoviedb.org/3/movie/" +
					selectedMovieId +
					"/videos?api_key=" +
					apikey
			)
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					return response.json();
				})
				.then((data) => {
					setMovieTrailer(data.results);
				})
				.catch((error) => {
					console.error("Error fetching trailer data:", error);
				});
		}
	}, [selectedMovieId]);

	// Repeat the same error handling for the other fetch request

	useEffect(() => {
		if (selectedMovieId) {
			fetch(
				"https://api.themoviedb.org/3/movie/" +
					selectedMovieId +
					"/credits?api_key=" +
					apikey
			)
				.then((response) => response.json())
				.then((data) => {
					setcast(data.cast);
					setcrew(data.crew);
				});
		}
	}, [selectedMovieId]);
	let castlist = "";
	if (Cast.length > 0) {
		castlist = Cast.map((castMember) => castMember.name).join(", ");
	}
	let bool = false;

	let year, da, mn, yr;
	if (selectedMovieYear) {
		year = selectedMovieYear.split("-");
		[yr, mn, da] = year;
		bool = true;
	}
	return (
		<div className="movie-details">
			<div>
				<div
					className={`logo-cont logo-link  ${
						selectedMovieId ? "" : "margin-bootom"
					}`}>
					<img src="./images/logo6.png" alt="logo" className="logo" />{" "}
					<span>movieradar</span>
				</div>
				{selectedMovieId && (
					<div>
						<div className="iframe-cont">
							{moviTrailer?.length > 0 && (
								<iframe
									width="1200"
									height="500"
									src={`https://www.youtube.com/embed/${moviTrailer[0].key}?rel=0&controls=0&modestbranding=1`}
									title="Jack Reacher: Never Go Back (2016) - IMAX Trailer - Paramount Pictures"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									allowFullScreen></iframe>
							)}
						</div>
						<div className="details-container">
							<div>
								<img
									src={`https://image.tmdb.org/t/p/w500/${selectedMovieBackdrop}`}
									alt=""
								/>
							</div>
							<div>
								<h2 className="detail-title">{`${selectedMovieTitle} (${
									bool ? `${yr}` : `1967`
								})`}</h2>
								<p className="synopsis">{selectedMovieOverview}</p>
								<p className="cast">
									<strong>Director:</strong>{" "}
									{crrew?.length > 0 ? crrew[0].name : "N/A"}{" "}
								</p>
								<p className="cast">
									<strong>Cast:</strong> {Cast ? castlist : "N/A"}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
			<Footer></Footer>
		</div>
	);
}

export default MovieDetail;
