import styled from "styled-components";
export let darker_shade = "#fff3de";
export let lighter_shade = "#fffaf3";



export const ListName = styled.div`
  padding: 10px 40px 10px 40px;
  cursor: pointer;
  vertical-align: top;
  position: ${props => props.position || "static"};
  bottom: ${props => props.bottom || null};
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: inline-block;
  vertical-align: top;
  margin-top: -8px;
  margin-right: 20px;
  background: ${darker_shade};
`;