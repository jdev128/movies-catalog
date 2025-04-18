import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import starIcon from "../assets/bxs-star.svg";
import "./MovieCard.css";

const MovieCard = ({ title, description, posterURL, stars }) => {

  const descriptionTag = useRef();
  const resizeListener = useRef();

  const calculateOverflow = () => {
    descriptionTag.current.scrollHeight > descriptionTag.current.clientHeight
    ? descriptionTag.current.setAttribute("data-overflow", "")
    : descriptionTag.current.removeAttribute("data-overflow");
  }

  useEffect(() => {
    resizeListener.current = window.addEventListener("resize", calculateOverflow);
    return () => {
      window.removeEventListener("resize", resizeListener.current);
    }
  }, [])

  useEffect(() => {
    calculateOverflow()
  }, [title, description]);

  return (
    <div className="card-container">
      <div className="poster-container">
        <img className="poster" src={posterURL} alt={`${title} Poster`} />
        <div className="stars">
          <img className="star-icon" src={starIcon} alt="Stars" />
          {Number.parseFloat(stars).toFixed(1)}
        </div>
      </div>
      <h3 className="movie-title">{title}</h3>
      <p className="movie-description" ref={descriptionTag}>
        {description}
      </p>
    </div>
  );
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  posterURL: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
};

export default MovieCard;
