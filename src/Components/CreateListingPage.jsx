import { useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
  petsErrorFun,
  petsLoadingFun,
  petsSuccessFun,
} from "../Redux/Pets/action";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { API_URL } from "../api";

const H2 = styled.h2`
  text-align: center;
`;
const Div = styled.div`
  width: 38%;
  padding: 3%;
  box-sizing: border-box;
  background-color: white;
  border-radius: 8px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    input,
    select {
      height: 33px;
      padding-left: 15px;
      outline: none;
      border: 1px solid #dddddd;
    }
    input[type="submit"] {
      height: 38px;
      border: none;
      background-color: #a85cf9;
      color: white;
      font-size: 17px;
      :hover {
        opacity: 0.9;
      }
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

  const { token } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const dataDetails = {
    name,
    city,
    address,
    capacity,
    cost_per_day,
    verified,
    rating,
  };

  const handleForm = (e) => {
    e.preventDefault();

    dispatch(petsLoadingFun());
    fetch(`${API_URL}/listing/create`, {
      method: "POST",
      body: JSON.stringify(dataDetails),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
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
      <H2>Create Listing</H2>
      <Div>
        <form
          onSubmit={(e) => {
            handleForm(e);
          }}
          className="form"
        >
          <input
            required
            type="text"
            placeholder="Name"
            name=""
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            required
            type="text"
            placeholder="City"
            name="City"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <input
            required
            type="text"
            placeholder="Address"
            name=""
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <input
            required
            type="number"
            placeholder="Capacity"
            name=""
            value={capacity}
            onChange={(e) => {
              setCapacity(e.target.value);
            }}
          />
          <input
            required
            type="number"
            placeholder="Cost per day"
            name=""
            value={cost_per_day}
            onChange={(e) => {
              setCostPerCity(e.target.value);
            }}
          />
          <select
            required
            name=""
            id=""
            onChange={(e) => {
              setVerified(e.target.value);
            }}
          >
            <option value="">Verified</option>
            <option value="yes">yes</option>
            <option value="no">no</option>
          </select>

          <input
            required
            type="number"
            placeholder="Rating"
            name=""
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
          <input type="submit" />
        </form>
      </Div>
      <Footer />
    </div>
  );
};
