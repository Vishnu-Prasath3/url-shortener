import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  let clickCount = () => {
    let sum = 0;
    props.info.forEach((ele) => {
      sum += ele.count;
    });
    return sum;
  };

  return (
    <div className="col-lg-6 col-md-6 col-sm-8 mx-auto pt-5">
      <div class="card bg-transparent border-info">
        <div class="card-header fw-bold fs-5 text-primary text-center">
          Your URL Shorteners
        </div>
        <div class="card-body text-center">
          <h5 class="card-title fw-bold">
            Total URL Created : {props.info.length}
          </h5>
          <h5 class="card-title fw-bold">
            Total number of clicks: {clickCount()}{" "}
          </h5>
          <Link to={"/enterurl"} className="btn btn-outline-dark text fw-bold">
            View/Add your URL's
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;