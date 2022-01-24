import styled from "styled-components";


export function Nav({ show_back, show_next, handleBack, handleNext }) {

    return (
        <NavWrapper>
            <NavButton visible={show_back} onClick={handleBack}>back</NavButton>
            <NavButton visible={show_next} onClick={handleNext}>next</NavButton>
        </NavWrapper>
    );
}

const NavButton = styled.button`
background: none;
padding: 30px;
cursor: pointer;
visibility: ${({ visible })=> visible? "visible": "hidden"}
`;

const NavWrapper = styled.div`
position:fixed;
top:0;
z-index: 1;
display: flex;
justify-content: space-between;
width: 100%;

`;