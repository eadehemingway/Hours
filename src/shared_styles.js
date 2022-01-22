
import styled from "styled-components";

let section_colour = "#D9D0BD";


export const BlankPageHeader = styled.h1`
font-size: 10rem;
color: red;
`;


export const Section = styled.section`
background: ${section_colour};
width: 100%;
height: 100vh;
overflow: hidden;
`;

export const SectionHeader = styled.h1`
font-family: headline-gothic-atf, sans-serif;
font-size: 8rem;
font-weight: 400;
letter-spacing: 2rem;
font-style: normal;
text-align: center;
width: 100%;
color: #E15838;
padding-top: 40px;
`;

export const SectionHeaderGrand = styled(SectionHeader)`
font-size: 20rem;
letter-spacing: 5rem;
display: flex;
padding-top: 0px;
height: 100vh;
justify-content: center;
align-items: center;
`;