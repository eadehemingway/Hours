import styled from "styled-components";
let minus_icon_path = "M 25 50 L 75 50";

export function MinusIcon({ handleClick }) {

    return (
        <IconWrapper onClick = {handleClick}>
            <svg viewBox='0 0 100 100'>
                <path strokeWidth='2px' stroke="black" d={minus_icon_path}/>
            </svg>
        </IconWrapper>
    );
}

const IconWrapper = styled.div`


`;