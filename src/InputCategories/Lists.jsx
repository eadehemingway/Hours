import styled from 'styled-components';
import { ColumnHeader, darker_shade } from "./general_styles";
import { ListItem } from "./ListItem";


export function Lists({chooseList, data}) {
    return (
      <ColumnTwo className="list-wrapper">
        <ColumnHeader>Preset lists</ColumnHeader>
        {data.map((d, i) => <ListItem data = {d} list_i = {i} key = {`list_${i}`} chooseList = {chooseList}/>)}
      </ColumnTwo>
    );
}

const ColumnTwo = styled.div`
  width: 30%;
  height: 100vh;
  float: left;
  background: ${darker_shade};
`;
