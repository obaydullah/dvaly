import { Badge } from "react-bootstrap";

export default function Rating({ rating, numberOfRating }) {
  return (
    <>
      <i
        className={
          rating >= 1
            ? "fas fa-star"
            : rating >= 0.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }
      ></i>
      <i
        className={
          rating >= 2
            ? "fas fa-star"
            : rating >= 1.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }
      ></i>
      <i
        className={
          rating >= 3
            ? "fas fa-star"
            : rating >= 2.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }
      ></i>
      <i
        className={
          rating >= 4
            ? "fas fa-star"
            : rating >= 3.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }
      ></i>
      <i
        className={
          rating >= 5
            ? "fas fa-star"
            : rating >= 4.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }
      ></i>

      <h5></h5>
      <h5>
        Total <Badge bg="secondary">{numberOfRating}</Badge> rating
      </h5>
    </>
  );
}
