import React, { useState } from "react";
import ReactDOM from "react-dom";
import Downshift from "downshift";
import axios from "axios";

import "./styles.css";

const DownshiftTwo = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = (movie) => {
    const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=${movie}`;
    axios.get(moviesURL).then(response => {
      setMovies(response.data.results)
    });
  }

  const inputOnChange = (event) => {
    if (!event.target.value) {
      return;
    }
    fetchMovies(event.target.value);
  }

  const downshiftOnChange = (selectedMovie) => {
    alert(`your favourite movie is ${selectedMovie.title}`);
  }

  return (
    <Downshift
      onChange={downshiftOnChange}
      itemToString={item => (item ? item.title : "")}
    >
      {({
        selectedItem,
        getInputProps,
        getItemProps,
        highlightedIndex,
        isOpen,
        inputValue,
        getLabelProps
      }) => (
        <div>
          <label
            style={{ marginTop: "1rem", display: "block" }}
            {...getLabelProps()}
          >
            Choose your favourite movie
          </label>{" "}
          <br />
          <input
            {...getInputProps({
              placeholder: "Search movies",
              onChange: inputOnChange
            })}
          />
          {isOpen ? (
            <div className="downshift-dropdown">
              {movies
                .filter(
                  item =>
                    !inputValue ||
                    item.title
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                )
                .slice(0, 10)
                .map((item, index) => (
                  <div
                    className="dropdown-item"
                    {...getItemProps({ key: index, index, item })}
                    style={{
                      backgroundColor:
                        highlightedIndex === index ? "lightgray" : "white",
                      fontWeight: selectedItem === item ? "bold" : "normal"
                    }}
                  >
                    {item.title}
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      )}
    </Downshift>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<DownshiftTwo />, rootElement);
