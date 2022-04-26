import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

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
        <i
          className="bx bxs-trash-alt delete"
          onClick={() => {
            console.log("heelo");
          }}
        ></i>
        <i
          className="bx bxs-edit-alt edit"
          onClick={() => {
            console.log("helll");
          }}
        ></i>
      </td>
    </>
  );
};
