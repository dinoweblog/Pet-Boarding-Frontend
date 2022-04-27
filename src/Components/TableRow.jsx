import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import Modal from "./Modal";

const Tr = styled.tr`
  :hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
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
  return (
    <>
      <Tr
        className="row"
        onClick={() => {
          navigate(`/listing/${id}`);
        }}
      >
        <td>{sn}</td>
        <td>{name}</td>
        <td>{city}</td>
        <td>{address}</td>
        <td>{capacity}</td>
        <td>{cost_per_day}</td>
        <td>{verified}</td>
        <td>{rating}</td>
      </Tr>
      <td className="icons">
        <i className="bx bxs-trash-alt delete" onClick={() => setIsOpen(true)}></i>
        <i className="bx bxs-edit-alt edit" onClick={() => setIsOpen(true)}></i>
        {isOpen && <Modal setIsOpen={setIsOpen} />}
      </td>

      {/* <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && <Modal setIsOpen={setIsOpen} />} */}
    </>
  );
};
