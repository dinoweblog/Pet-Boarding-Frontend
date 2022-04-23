import { useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import {
  petsErrorFun,
  petsLoadingFun,
  petsSuccessFun,
} from "../Redux/Pets/action";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
const Div = styled.div`
  width: 40%;
  padding: 30px;
  box-sizing: border-box;
  border: 1px solid green;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    input {
      height: 30px;
      outline: none;
      padding-left: 10px;
    }
  }
`;

export const CreateListingPage = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [cost_per_day, setCostPerCity] = useState("");
  const [verified, setVerified] = useState("");
  const [rating, setRating] = useState("");
  const [summary, setSummary] = useState("");
  const [watch_time, setWatchTime] = useState("");
  const [pet_types, setPetTypes] = useState("");
  const [pet_size, setPetSize] = useState("");
  const [supervision_level, setSupervisionLevel] = useState("");
  const [live_place, setLivePlace] = useState("");
  const [sleep_place, setSleepPlace] = useState("");
  const [no_of_potty_breaks, setNo_of_potty_breaks] = useState("");
  const [no_of_walks, setNo_of_walks] = useState("");
  const [my_home, setMyHome] = useState("");
  const [outdoor_area_size, setOutdoor_area_size] = useState("");
  const [emergency_transport, setEmergencyTransport] = useState("");

  const dispatch = useDispatch();

  const dataDetails = {
    name,
    city,
    address,
    capacity,
    cost_per_day,
    verified,
    rating,
    summary,
    watch_time,
    pet_types,
    pet_types,
    pet_size,
    supervision_level,
    live_place,
    sleep_place,
    no_of_potty_breaks,
    no_of_walks,
    my_home,
    outdoor_area_size,
    emergency_transport,
  };

  const handleForm = () => {
    // axios
    //   .post("http://localhost:3000/pets_data", dataDetails)
    //   .catch((error) => console.log(error));
    dispatch(petsLoadingFun);
    fetch(`http://localhost:3000/pets_data`, {
      method: "POST",
      body: JSON.stringify(dataDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(petsSuccessFun(res));
      })
      .catch((error) => dispatch(petsErrorFun()));
  };

  return (
    <div>
      <Navbar />
      <Div>
        <form onSubmit={handleForm} className="form">
          <input
            type="text"
            placeholder="Name"
            name=""
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="City"
            name="City"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Address"
            name=""
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Capacity"
            name=""
            value={capacity}
            onChange={(e) => {
              setCapacity(e.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Cost per day"
            name=""
            value={cost_per_day}
            onChange={(e) => {
              setCostPerCity(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Verified"
            name=""
            value={verified}
            onChange={(e) => {
              setVerified(e.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Rating"
            name=""
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />

          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={summary}
            placeholder="Summary..."
            onChange={(e) => {
              setSummary(e.target.value);
            }}
          ></textarea>
          <input
            type="number"
            placeholder="Watch Time"
            name=""
            value={watch_time}
            onChange={(e) => {
              setWatchTime(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Pet Types"
            name=""
            value={pet_types}
            onChange={(e) => {
              setPetTypes(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Pet Size"
            name=""
            value={pet_size}
            onChange={(e) => {
              setPetSize(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Supervision level"
            name=""
            value={supervision_level}
            onChange={(e) => {
              setSupervisionLevel(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Live Place"
            name=""
            value={live_place}
            onChange={(e) => {
              setLivePlace(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Sleep Place"
            name=""
            value={sleep_place}
            onChange={(e) => {
              setSleepPlace(e.target.value);
            }}
          />
          <input
            type="number"
            placeholder="no of potty breaks"
            name=""
            value={no_of_potty_breaks}
            onChange={(e) => {
              setNo_of_potty_breaks(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="no of walks"
            name=""
            value={no_of_walks}
            onChange={(e) => {
              setNo_of_walks(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="My home"
            name=""
            value={my_home}
            onChange={(e) => {
              setMyHome(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="outdoor area size"
            name=""
            value={outdoor_area_size}
            onChange={(e) => {
              setOutdoor_area_size(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="emergency transport"
            name=""
            value={emergency_transport}
            onChange={(e) => {
              setEmergencyTransport(e.target.value);
            }}
          />
          <input type="submit" />
        </form>
      </Div>
      <Footer />
    </div>
  );
};
