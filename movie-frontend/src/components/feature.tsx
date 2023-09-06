import React from "react";
import "../css/feature.css";

interface featureProps {
	id: Number;
	title: string;
	rating: Number;
	year: String;
	image: String;
}
const Feature: React.FC<featureProps> = ({
	id,
	title,
	rating,
	year,
	image,
}) => {
	const y = year.split("-");
	const [yr, mn, dt] = y;
	// const nor = `${dt}-${mn}-${yr}`;
	return (
		<div>
			<div className="movie">
				<img
					src={`https://image.tmdb.org/t/p/w500/${image}`}
					className="feature-img"
					alt=""
				/>
				<h2 className="feature-title">{title}</h2>
				<h2 className="feature-rating">
					<span className="star">&#9733;&#9733;&#9733; </span>{" "}
					{rating.toFixed(1)}
				</h2>
				<span className="feature-released-year">{yr}</span>
			</div>
		</div>
	);
};

export default Feature;
