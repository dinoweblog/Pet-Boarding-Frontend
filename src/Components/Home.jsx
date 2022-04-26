import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPetsData } from "../Redux/Pets/action";
import { TableRow } from "./TableRow";
import styled from "styled-components";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import loading_gif from "../images/loading-gif.png";

const Container = styled.div`
  width: 100%;
  .top-text {
    width: 50%;
    margin: auto;
    margin-bottom: 30px;
    text-align: center;
    color: #00092c;
  }
`;

const Div = styled.div`
  background-color: white;
  width: 80%;
  margin: auto;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .pagination {
    margin: auto;
    margin-top: 30px;
    gap: 5px;
    display: inline-block;
    button {
      color: black;
      padding: 8px 16px;
      text-decoration: none;
      transition: background-color 0.4s;
      border: 1px solid #ddd;
      font-size: 15px;
    }
  }

  table {
    border-collapse: collapse;
    /* text-align: left; */

    tbody {
      height: 315px;
    }
    thead {
      border-bottom: 1px solid #dddddd;
      border-top: 1px solid #dddddd;
      tr {
        color: #01d6af;
      }
    }
    th,
    td {
      padding: 20px;
    }
    tr {
      /* height: 63px; */
      box-sizing: border-box;
      border-bottom: 1px solid #dddddd;
    }
  }

  .filter_sort {
    display: flex;
    gap: 10%;
    margin-bottom: 20px;
    color: #01d6af;
    font-weight: 600;
  }
  .filter,
  .sort,
  .search-box {
    display: flex;
    flex-direction: column;
    button {
      margin-right: 20px;
      background-color: transparent;
      border: 1px solid green;
      border-radius: 4px;
      padding: 3px 15px;
      cursor: pointer;
      color: black;
    }
  }

  .search-box {
    input {
      padding-left: 5px;
      height: 25px;
      border: 1px solid gray;
      outline: none;
    }
  }
  .sort {
    button {
      margin-left: 0px;
      margin-right: 20px;
    }
  }

  .loading_img {
    width: 100px;
    img {
      width: 100%;
    }
  }
`;

export const Home = () => {
  const [city, setCity] = useState("");
  const [verify, setVerify] = useState("yes");
  const [costCheck, setCostCheck] = useState(true);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [height, setHeight] = useState(315);
  const [ratingCheck, setRatingCheck] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isActive, setActive] = useState({ isVisible: false });

  const dispatch = useDispatch();

  let { pets, totalPages } = useSelector((state) => state.pets);
  const [petData, setPetData] = useState([...pets]);
  const [btn, setBtn] = useState(new Array(totalPages).fill("a"));

  useEffect(() => {
    dispatch(getPetsData(page, size, setLoading));
  }, [page]);

  useEffect(() => {
    setPetData([...pets]);
  }, [pets, dispatch]);

  useEffect(() => {
    setBtn(new Array(totalPages).fill("btn"));
  }, [totalPages, dispatch]);

  const searchCity = () => {
    const t = pets.filter(
      (el) => el.city.toLowerCase().indexOf(city.toLowerCase()) !== -1
    );
    setPetData([...t]);
  };

  const filterItemsV = () => {
    const t = pets.filter(
      (el) => el.verified.toLowerCase() === verify.toLowerCase()
    );
    verify === "yes" ? setVerify("no") : setVerify("yes");
    setPetData([...t]);
  };

  const filterCity = () => {
    const t = pets.filter(
      (el) => el.city.toLowerCase() === verify.toLowerCase()
    );
    verify === "yes" ? setVerify("no") : setVerify("yes");
    setPetData([...t]);
  };

  const SortByCost = () => {
    const t = costCheck
      ? pets.sort((a, b) => {
          return a.cost_per_day - b.cost_per_day;
        })
      : pets.sort((a, b) => {
          return b.cost_per_day - a.cost_per_day;
        });

    costCheck ? setCostCheck(false) : setCostCheck(true);

    setPetData([...t]);
  };

  const SortByRating = () => {
    const t = ratingCheck
      ? pets.sort((a, b) => {
          return a.rating - b.rating;
        })
      : pets.sort((a, b) => {
          return b.rating - a.rating;
        });
    ratingCheck ? setRatingCheck(false) : setRatingCheck(true);
    setPetData([...t]);
  };

  return (
    <Container>
      <Navbar />
      <Div>
        <h2 className="top-text">
          Some Pet Boarding Locaton, Plans and All Details.
        </h2>
        <div className="filter_sort">
          <div className="search-box">
            <p>Search By City</p>
            <input
              type="text"
              name=""
              id=""
              placeholder="city..."
              onChange={(e) => {
                setCity(e.target.value);
                searchCity();
              }}
            />
          </div>
          <div className="filter">
            <p>Filter by City And Verified</p>
            <div>
              <button onClick={filterItemsV}>Verified</button>
              <button onClick={filterCity}>City</button>
            </div>
          </div>
          <div className="sort">
            <p>Sort By</p>
            <div>
              <button onClick={SortByCost}>Cost Per Day</button>
              <button onClick={SortByRating}>Rating</button>
            </div>
          </div>
          {/* <div>
            <select name="" id="" onChange={() => {}}>
              <option
                onSelect={() => {
                  //   filterByCost();
                }}
                value=""
              >
                Sort by Cost Ace
              </option>
              <option value="">Sort by Cost Dec</option>
              <option
                onSelect={() => {
                  filterByRating();
                }}
                value=""
              >
                Sort by Rating Ace
              </option>
              <option value="">Sort by Rating Dec</option>
            </select>
          </div> */}
        </div>
        <table>
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Name</th>
              <th>City</th>
              <th>Address</th>
              <th>Capacity</th>
              <th>Cost Per Day</th>
              <th>Verified</th>
              <th>Rating</th>
            </tr>
          </thead>
          {loading ? (
            <tbody className="loading" style={{ height: `${height}px` }}>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="loading_img">
                  <img src={loading_gif} alt="" />
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {petData.map((e, index) => (
                <TableRow
                  key={e._id}
                  id={e._id}
                  sn={index + 1}
                  name={e.name}
                  city={e.city}
                  address={e.address}
                  capacity={e.capacity}
                  cost_per_day={e.cost_per_day}
                  verified={e.verified}
                  rating={e.rating}
                />
              ))}
            </tbody>
          )}
        </table>

        <div className="pagination">
          {page === 1 ? (
            <button disabled>Prev</button>
          ) : (
            <button
              className={isActive ? "active" : null}
              onClick={() => {
                setPage(page - 1);
                setLoading(true);
              }}
            >
              Prev
            </button>
          )}

          {btn.map((e, index) => (
            <button
              className={isActive ? "active" : null}
              onClick={() => {
                setPage(index + 1);
                setLoading(true);
              }}
            >
              {index + 1}
            </button>
          ))}
          {page === totalPages ? (
            <button disabled>Next</button>
          ) : (
            <button
              className={isActive ? "active" : null}
              onClick={() => {
                setPage(page + 1);
                setLoading(true);
              }}
            >
              Next
            </button>
          )}
        </div>
      </Div>
      <Footer />
    </Container>
  );
};
