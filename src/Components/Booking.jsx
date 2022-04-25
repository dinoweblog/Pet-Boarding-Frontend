import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableRow } from "./TableRow";
import styled from "styled-components";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { getUsersPetsData } from "../Redux/UsersPets/action";

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
  .sort,
  .search-box {
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

export const Booking = () => {
  const [city, setCity] = useState("");
  const [verify, setVerify] = useState("yes");
  const [costCheck, setCostCheck] = useState(true);
  const [ratingCheck, setRatingCheck] = useState(true);
  const dispatch = useDispatch();

  let { usersPets } = useSelector((state) => state.usersPets);
  const [petData, setPetData] = useState([...usersPets]);
  useEffect(() => {
    dispatch(getUsersPetsData());
  }, []);

  useEffect(() => {
    setPetData([...usersPets]);
  }, [usersPets, dispatch]);

  //   const filterItems = () => {
  //     const t = pets.filter(
  //       (el) => el.city.toLowerCase().indexOf(city.toLowerCase()) !== -1
  //     );

  //     setPetData([...t]);
  //   };

  //   const filterItemsV = () => {
  //     const t = pets.filter(
  //       (el) => el.verified.toLowerCase() === verify.toLowerCase()
  //     );
  //     verify === "yes" ? setVerify("no") : setVerify("yes");
  //     setPetData([...t]);
  //   };

  // const filterCity = () => {
  //   const t = pets.filter(
  //     (el) => el.city.toLowerCase() === verify.toLowerCase()
  //   );
  //   verify === "yes" ? setVerify("no") : setVerify("yes");
  //   setPetData([...t]);
  // };

  //   const SortByCost = () => {
  //     const t = costCheck
  //       ? pets.sort((a, b) => {
  //           return a.cost_per_day - b.cost_per_day;
  //         })
  //       : pets.sort((a, b) => {
  //           return b.cost_per_day - a.cost_per_day;
  //         });

  //     costCheck ? setCostCheck(false) : setCostCheck(true);

  //     setPetData([...t]);
  //   };

  //   const SortByRating = () => {
  //     const t = ratingCheck
  //       ? pets.sort((a, b) => {
  //           return a.rating - b.rating;
  //         })
  //       : pets.sort((a, b) => {
  //           return b.rating - a.rating;
  //         });
  //     ratingCheck ? setRatingCheck(false) : setRatingCheck(true);
  //     setPetData([...t]);
  //   };

  // console.log("petData", petData);
  // console.log("filter", city);

  return (
    <Container>
      <Navbar />
      <Div>
        <table>
          <thead>
            <Row className="row">
              <th>S.N.</th>
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
