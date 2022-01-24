import styled from "styled-components";
let minus_icon_path = "M 25 50 L 75 50";

export function MinusIcon({ handleClick }) {

    return (
        <IconWrapper onClick = {handleClick} id="minus-icon">
            <svg viewBox='0 0 100 100'>
                <path strokeWidth='2px' stroke="black" d={minus_icon_path}/>
            </svg>
        </IconWrapper>
    );
}

const IconWrapper = styled.div`
    cursor: pointer;
    width: 30px;
    height: 30px;
    background: red;
    font-weight: 400;
    font-style: normal;
    position: absolute;
    top: 0px;
    right:0px;
    display: none;
    border-radius: 50%;

`;