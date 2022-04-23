import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const TableRow = ({
  id,
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
    <tr
      className="row"
      onClick={() => {
        navigate(`/listing/${id}`);
      }}
    >
      <td>{id}</td>
      <td>{name}</td>
      <td>{city}</td>
      <td>{address}</td>
      <td>{capacity}</td>
      <td>{cost_per_day}</td>
      <td>{verified}</td>
      <td>{rating}</td>
    </tr>
  );
};
