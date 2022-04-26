import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

const H1 = styled.h1`
  text-align: center;
`;

const Nav = styled.div`
  .nav {
    border-bottom: 1px solid gray;
  }
`;

const Div = styled.div`
  width: 30%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: white;
  box-sizing: border-box;
  padding: 2%;
  border-radius: 8px;
  margin-top: 30px;
  input,
  select {
    height: 33px;
    padding-left: 15px;
    outline: none;
    border: 1px solid #DDDDDD;
  }
  button {
    height: 38px;
    border: none;
    background-color: #a85cf9;
    color: white;
    font-size: 17px;
    :hover {
      opacity: 0.9;
    }
  }
`;

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [roles, setRoles] = useState([]);
  const [e, setError] = useState("");

  const Navigate = useNavigate();

  const userDetails = {
    name,
    email,
    password,
    mobile,
    gender,
    roles,
  };

  const handleSubmit = () => {
    fetch(`https://pet-boarding-server.herokuapp.com/register`, {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      // .then((res) => )
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Nav>
        <Navbar />
      </Nav>
      <H1>Register</H1>
      <Div>
        <input
          required
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          required
          type="number"
          placeholder="Enter Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          required
          type="text"
          placeholder="Enter Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        <select
          required
          name=""
          id=""
          onChange={(e) => {
            setRoles([e.target.value]);
          }}
        >
          <option value="">roles</option>
          <option value="users">users</option>
          <option value="admin">admin</option>
        </select>

        <button
          onClick={() => {
            handleSubmit();
            Navigate("/login");
          }}
        >
          Register
        </button>
      </Div>
      <Footer />
    </>
  );
};
