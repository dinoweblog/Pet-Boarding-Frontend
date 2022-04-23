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
`;

const Div = styled.div`
  border: 1px solid green;
  background-color: white;
  width: 80%;
  margin: auto;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;

  table {
    border: 1px solid gray;
    text-align: left;
    th,
    td {
      padding: 20px;
    }
  }

  .filter_sort {
    display: flex;
    gap: 10%;
    margin-bottom: 20px;
  }
  .filter,
  .sort {
    display: flex;
    flex-direction: column;
    button {
      margin-left: 20px;
      background-color: transparent;
      border: 1px solid green;
      border-radius: 4px;
      padding: 3px;
      cursor: pointer;
      color: black;
    }
  }
  .sort {
    button {
      margin-left: 0px;
      margin-right: 20px;
    }
  }
`;

const Row = styled.tr`
  border: 1px solid gray;
  padding: 20px;
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

  const filterItems = () => {
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
        <div className="filter_sort">
          <div className="filter">
            <p>Filter by City And Verified</p>
            <div>
              <input
                type="text"
                name=""
                id=""
                placeholder="City..."
                onChange={(e) => {
                  setCity(e.target.value);
                  filterItems();
                }}
              />
              <button onClick={filterItemsV}>Filter by Verified</button>
            </div>
          </div>
          <div className="sort">
            <p>Sort By</p>
            <div>
              <button onClick={SortByCost}>Sort by Cost</button>
              <button onClick={SortByRating}>Sort by Rating</button>
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
            <Row className="row">
              <th>Id</th>
              <th>Name</th>
              <th>City</th>
              <th>Address</th>
              <th>Capacity</th>
              <th>Cost Per Day</th>
              <th>Verified</th>
              <th>Rating</th>
            </Row>
          </thead>
          <tbody>
            {petData.map((e) => (
              <TableRow
                key={e.id}
                id={e.id}
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
