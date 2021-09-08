import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Mdb() {
  var [data, setData] = React.useState([]);
  var [search_term, setSearchterm] = React.useState("");
  var [need_input, setNeedinput] = React.useState(false);

  React.useEffect(() => {
    setSearchterm(localStorage.getItem("search_term"));
    datagetter(localStorage.getItem("search_term"));
    // datagetter(search_term);
  }, []);
  function datagetter(search_term) {
    console.log("searchterm", search_term);
    console.log(typeof search_term);
    if (search_term === "") {
      setNeedinput("search something...");
    }
    axios
      .get(`http://www.omdbapi.com/?s=${search_term}&apikey=9e579f61`)
      .then((response) => {
        console.log(response.data);
        if (response.data.Response == "False") {
          if (search_term != "") {
            setNeedinput(response.data.Error);
          }
        } else {
          setData(response.data.Search);
          setNeedinput(false);
        }
      })
      .catch((error) => console.log("error message", error.message));
  }

  return (
    <div className="row">
      <div className="col-1"></div>
      <div className="col-10">
        <div className="form-group">
          <input
            type="text"
            class="form-control m-2"
            id="exampleInputPassword1"
            placeholder="Type movie name"
            value={search_term}
            onChange={(e) => {
              console.log("before setting", e.target.value);
              setSearchterm(e.target.value);

              datagetter(e.target.value);
            }}
          />

          {need_input && <h4>{need_input}</h4>}

          {!need_input && data && (
            <div class="d-flex flex-row flex-wrap bd-highlight mb-3">
              {data.map((movie) => {
                var path = "/movie/" + movie.imdbID;
                return (
                  <div className="col-sm-6 col-lg-3 col-md-4">
                    <Link
                      to={path}
                      onClick={() => {
                        localStorage.setItem("search_term", search_term);
                      }}
                    >
                      <img
                        src={movie.Poster}
                        class="card-img-top mt-2 mb-2"
                        style={{
                          width: "90%",
                          height: "20rem",
                          // border: "px solid black",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="col-1"></div>
    </div>
  );
}

export default Mdb;
