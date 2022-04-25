import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPetsData } from "../Redux/Pets/action";
import { TableRow } from "./TableRow";
import styled from "styled-components";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const Container = styled.div`
  min-height: 900px;
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

  table {
    border-collapse: collapse;
    text-align: left;

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
`;

export const Home = () => {
  const [city, setCity] = useState("");
  const [verify, setVerify] = useState("yes");
  const [costCheck, setCostCheck] = useState(true);
  const [ratingCheck, setRatingCheck] = useState(true);
  const dispatch = useDispatch();

  let { pets } = useSelector((state) => state.pets);
  const [petData, setPetData] = useState([...pets]);
  useEffect(() => {
    dispatch(getPetsData());
  }, []);

  useEffect(() => {
    setPetData([...pets]);
  }, [pets, dispatch]);

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

  // console.log("petData", petData);
  // console.log("filter", city);

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
              <button onClick={filterCity}>Verified</button>
            </div>
          </div>
          <div className="sort">
            <p>Sort By</p>
            <div>
              <button onClick={SortByCost}>Cost</button>
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
        </table>
      </Div>
      <Footer />
    </Container>
  );
};
