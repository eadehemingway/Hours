import styled from "styled-components";
import { PAGES } from "./data";


export function Nav({ current_page_index, setCurrentPageIndex }) {

    const show_next = current_page_index !== PAGES.length-1;
    const show_back = current_page_index !== 0;


    function handleNext(){
        setCurrentPageIndex(current_page_index + 1);

    }

    function handleBack(){
        setCurrentPageIndex(current_page_index - 1);
    }
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