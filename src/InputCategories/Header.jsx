import styled from 'styled-components';
import { lighter_shade } from "./general_styles";



export function Header() {
    return (
      <ColumnOne>
        <SectionHeader>Categories of spending</SectionHeader>
        <SectionSubHeader>Choose and edit a preset list or create your own</SectionSubHeader>
      </ColumnOne>
    )
}

const ColumnOne = styled.div`
  width: 30%;
  height: 100vh;
  float: left;
  background: ${lighter_shade};
`;

const SectionHeader = styled.h1`
  font-family: gastromond, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 36px;
  padding: 40px 40px 0px 40px;
`;

const SectionSubHeader = styled.h2`
  font-weight: 300;
  font-style: normal;
  font-size: 18px;
  padding: 40px 40px 40px 40px;
`;