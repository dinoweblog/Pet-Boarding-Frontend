import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { useReducer, useState } from "react";
import Modal from "./Modal";
import Modal2 from "./Modal2";
import {
  getPetsData,
  petsDeleteFun,
  petsErrorFun,
  petsLoadingFun,
  petsSuccessFun,
} from "../Redux/Pets/action";
import { useDispatch, useSelector } from "react-redux";

const Div = styled.div`
  display: flex;
  border-bottom: 1px solid #dddddd;
  .row-hover {
    :hover {
      background-color: #f2f2f2;
      cursor: pointer;
    }
  }
  .visit {
    padding: 20px 0;
    color: green;
  }
`;

const Span = styled.span`
  position: absolute;
`;

export const TableRow = ({
  id,
  sn,
  name,
  city,
  address,
  capacity,
  cost_per_day,
  verified,
  rating,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const { pets } = useSelector((state) => state.pets);
  const { token, isAuthenticated, roles } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  // Delete and Edit network request
  const deleteData = () => {
    dispatch(petsLoadingFun());
    fetch(`https://pet-boarding-server.herokuapp.com/listing/delete/${id}`, {
      method: "DELETE",
      // body: JSON.stringify(dataDetails),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(getPetsData());
      })
      .catch((error) => dispatch(petsErrorFun()));
  };

  return (
    <Div>
      <div
        className="row row-hover"
        onClick={() => {
          navigate(`/listing/${id}`);
        }}
      >
        <div className="td sn">{sn}</div>
        <div className="td">{name}</div>
        <div className="td">{city}</div>
        <div className="td">{address}</div>
        <div className="td">{capacity}</div>
        <div className="td">{cost_per_day}</div>
        <div className="td">{verified}</div>
        <div className="td">{rating}</div>
      </div>
      {token != "" && roles[0] === "admin" ? (
        <div className="icons">
          <i
            className="bx bxs-trash-alt delete"
            onClick={() => setIsOpen(true)}
          ></i>
          <i
            className="bx bxs-edit-alt edit"
            onClick={() => setIsOpen2(true)}
          ></i>
          {isOpen && <Modal deleteData={deleteData} setIsOpen={setIsOpen} />}
          {isOpen2 && <Modal2 id={id} setIsOpen2={setIsOpen2} />}
        </div>
      ) : (
        <div className="visit">
          <i class="bx bx-chevrons-right"></i>
        </div>
      )}
      {/* <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && <Modal setIsOpen={setIsOpen} />} */}
    </Div>
  );
};
