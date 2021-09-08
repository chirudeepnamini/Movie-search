import axios from "axios";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function Movie() {
  const { movie_id } = useParams();
  var [data, setData] = React.useState(null);
  var [loading, setLoading] = React.useState(true);
  var [error, setError] = React.useState(null);
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.omdbapi.com/?i=${movie_id}&apikey=9e579f61`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => setError(error.message));
  }, []);
  if (loading) {
    return <h4>Loading....</h4>;
  }
  if (error) {
    return <h4>{error}</h4>;
  }
  return (
    <div className="row ">
      <div className="md-col-5 sm-col-12 col-lg-3 pl-md-4 d-flex">
        <div className="align-self-center">
          <img
            className="p-2"
            src={data.Poster}
            alt=""
            style={{ width: "20rem", height: "30rem", objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="md-col-7 col-lg-9" style={{}}>
        <h2 style={{ fontSize: "2.5rem" }}>{data.Title}</h2>

        <p className="pr-auto">{data.Plot}</p>
        <h4>Directed by {data.Director}</h4>
        <Link to="/">
          <button type="button" class="btn btn-primary">
            Go to home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Movie;
