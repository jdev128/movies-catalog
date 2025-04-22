import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import starIcon from "../assets/bxs-star.svg";
import movieIcon from "../assets/icons8-movie.png";
import "./MovieCard.css";

const MovieCard = ({ title, description, posterURL, stars }) => {
  const [posterDownloadError, setPosterDownloadError] = useState(false);
  const [descriptionOverflow, setDescriptionOverflow] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({
    offsetX: 0,
    offsetY: 0,
    upper: false,
  });

  const descriptionTag = useRef();
  const tooltipTag = useRef();
  const resizeListener = useRef();

  const computeOverflow = () => {
    if (
      descriptionTag.current?.scrollHeight -
        descriptionTag.current?.clientHeight >
      2
    ) {
      descriptionTag.current?.setAttribute(
        "data-overflow",
        descriptionTag.current?.innerText
      );
      setDescriptionOverflow(true);
    } else {
      descriptionTag.current?.removeAttribute("data-overflow");
      setDescriptionOverflow(false);
    }
  };

  const computeTooltipPosition = (pointerMoveEvent) => {
    const screenLowerHalf = pointerMoveEvent.clientY > window.innerHeight / 2;
    return {
      offsetY: screenLowerHalf
        ? pointerMoveEvent.pageY - tooltipTag.current?.clientHeight
        : pointerMoveEvent.pageY,
      offsetX: pointerMoveEvent.pageX,
      upper: screenLowerHalf,
    };
  };

  useEffect(() => {
    resizeListener.current = window.addEventListener(
      "resize",
      computeOverflow
    );
    return () => {
      window.removeEventListener("resize", resizeListener.current);
    };
  }, []);

  useEffect(() => {
    computeOverflow();
  }, [title, description]);
  
  return (
    <div className="card-container">
      <div className="poster-container">
        {!posterURL || posterDownloadError ? (
          <div className="default-poster">
            <img src={movieIcon} alt="Default Poster" />
          </div>
        ) : (
          <img
            className="poster"
            src={posterURL}
            alt={`${title} Poster`}
            onError={() => {
              setPosterDownloadError(true);
            }}
          />
        )}
        <div className="stars">
          <img className="star-icon" src={starIcon} alt="Stars" />
          {Number.parseFloat(stars).toFixed(1)}
        </div>
      </div>
      <h3 className="movie-title">{title}</h3>
      <p
        className="movie-description"
        ref={descriptionTag}
        onPointerMove={(event) => {
          if (descriptionOverflow) {
            setTooltipPosition(computeTooltipPosition(event));
          }
        }}
      >
        {description}
      </p>
      {descriptionOverflow && (
        <p
          className={`description-tooltip ${
            tooltipPosition.upper ? "upper" : ""
          }`}
          data-x-offset={
            tooltipPosition.offsetX ? tooltipPosition.offsetX : undefined
          }
          data-y-offset={
            tooltipPosition.offsetY ? tooltipPosition.offsetY : undefined
          }
          ref={tooltipTag}
        >
          {description}
        </p>
      )}
    </div>
  );
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  posterURL: PropTypes.string,
  stars: PropTypes.number.isRequired,
};

export default MovieCard;
