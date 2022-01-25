
import styled from "styled-components";

let section_colour = "#fff6eb";
export let darker_shade = "#fff3de";
export let lighter_shade = "#fffaf3";

export const Section = styled.section`
background: ${section_colour};
width: 100%;
min-height: 100vh;
overflow: hidden;
position: relative;
`;

export const SectionInner = styled.div`
width: calc(100% - 200px);
padding: 80px 100px 100px 100px;
`;

export const SectionHeader = styled.h1`
font-family: headline-gothic-atf, sans-serif;
font-size: 8rem;
font-weight: 400;
letter-spacing: 2rem;
font-style: normal;
text-align: left;
width: 100%;
color: black;
padding-top: 40px;
margin: 0px;
margin-left: 50px;
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

export const TabStyled= styled.button`
  position: relative;
  border: 1px solid;
  padding: 10px;
  background: transparent;
  cursor: pointer;
  margin-left: -1px;
  font-weight: 400;
  font-style: normal;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 5px;
  text-decoration: ${props=> props.selected ? 'underline': "auto"};
  width: ${props => props.width ? props.width : "auto"};

`;
