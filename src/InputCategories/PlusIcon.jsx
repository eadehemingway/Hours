import styled from "styled-components";
import { darker_shade } from "./../shared_styles";
let plus_icon_path = "M 50 25 L 50 75 M 75 50 L 25 50";

export function PlusIcon({  handleClick }) {

    return (
        <IconWrapper onClick = {handleClick}>
            <svg viewBox='0 0 100 100'>
                <path strokeWidth='2px' stroke="black" d={plus_icon_path}/>
            </svg>
        </IconWrapper>
    );
}

export const IconWrapper = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: inline-block;
  vertical-align: top;
  margin-top: -8px;
  margin-right: 20px;
  background: ${darker_shade};
  font-weight: 400;
  font-style: normal;
`;