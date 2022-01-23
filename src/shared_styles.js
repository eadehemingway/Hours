
import styled from "styled-components";

let section_colour = "#D9D0BD";
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
width: calc(100% - 80px);
padding: 40px;
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
margin: 0px;
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

export const SelectedTab= styled.button`
  position: relative;
  border: 1px solid;
  border-bottom: none;
  padding: 20px;
  cursor: pointer;
  margin-left: -1px;
  border-radius: 20px 20px 0px 0px;
  font-family: goudy-old-style, serif;
  font-weight: 400;
  font-style: normal;
  font-size: 32px;
  background: ${section_colour};
  width: ${props => props.width ? props.width : "auto"}
`;
export const UnselectedTab= styled.button`
  position: relative;

  border: 1px solid;
  padding: 20px;
  cursor: pointer;
  font-family: goudy-old-style, serif;
  font-weight: 400;
  font-style: normal;
  margin-left: -1px;
  font-size: 32px;
  border-radius: 20px 20px 0px 0px;
  background: ${section_colour};
  width: ${props => props.width ? props.width : "auto"}
`;