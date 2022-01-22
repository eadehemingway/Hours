import styled from "styled-components";
export let darker_shade = "#fff3de";
export let lighter_shade = "#fffaf3";

export const ColumnThree = styled.div`
  width: 40%;
  height: 100vh;
  float: left;
  background: ${lighter_shade};
`;

export const ColumnHeader = styled.h2`
  font-family: gastromond, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  padding: 40px 40px 40px 40px;
`;

export const ListName = styled.div`
  padding: 10px 40px 10px 40px;
  cursor: pointer;
  vertical-align: top;
  position: ${props => props.position || "static"};
  bottom: ${props => props.bottom || null};
`;

export const IconOuter = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: inline-block;
  vertical-align: top;
  margin-top: -8px;
  margin-right: 20px;
  background: ${darker_shade};
`;