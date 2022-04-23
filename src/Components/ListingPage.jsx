import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const Div = styled.div`
  .background {
    width: 100%;
    height: 400px;
    background-image: url(https://media.istockphoto.com/photos/christmas-dogs-and-cats-over-white-web-header-picture-id1085114580?k=20&m=1085114580&s=612x612&w=0&h=I168HiLBk03-mx7B9JpJBDl-I2nV2-A0lrUu5zGB5hU=);
    background-size: cover;
    background-repeat: no-repeat;
  }
  .details {
    background-color: white;
    width: 70%;
    margin: auto;
    box-sizing: border-box;
    padding: 50px;
    text-align: center;
  }
`;
export const ListingPage = () => {
  const [data, setData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    findData();
  }, []);
  const findData = () => {
    fetch(`http://localhost:3000/pets_data/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setData({ ...res });
      })
      .catch((error) => console.log(error));
  };

  console.log("single data", data);

  return (
    <Div>
      <Navbar />
      <div className="background"></div>
      <div className="details">
        <h1>About Wiggle Bubble Pets Services</h1>
        <h3>Summery</h3>
        <p>{data.summary}</p>
        <h3>
          Number of pets that will be watched at one time: {data.watch_time}
        </h3>
        <h3>Accepted Pet Types</h3>
        <p>{data.pet_types}</p>
        <h3>Accepted Pet size</h3>
        <p>{data.pet_size}</p>
        <h3>Level of adult supervision.</h3>
        <p>{data.supervision_level}</p>
        <h3>
          The place your pet will be if they are left unsupervised at home.
        </h3>
        <p>{data.live_place}</p>
        <h3>The place your pet will sleep at night.</h3>
        <p>{data.sleep_place}</p>
        <h3>The number of potty breaks provided per day.</h3>
        <p>{data.no_of_potty_breaks}</p>
        <h3>The number of walks provided per day.</h3>
        <p>{data.no_of_walks}</p>
        <h3>The type of home I stay in.</h3>
        <p>{data.my_home}</p>
        <h3>My outdoor area size.</h3>
        <p>{data.outdoor_area_size}</p>
        <h3>Emergency transport.</h3>
        <p>{data.emergency_transport}</p>
      </div>
      <Footer />
    </Div>
  );
};
