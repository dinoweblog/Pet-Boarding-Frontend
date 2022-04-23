import { Link } from "react-router-dom";
import styled from "styled-components";
const Div = styled.div`
  padding: 10px 10%;
  background-color: white;
`;
export const Navbar = () => {
  return (
    <Div>
      <Link to={"/"}>Home</Link>
    </Div>
  );
};
