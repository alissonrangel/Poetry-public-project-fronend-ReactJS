import styled from 'styled-components';

const ContainerItem = styled.div`
  background-color: #F6d7d3;
  width: 400px;
  border: 3px solid #e47068;
  margin: 30px auto;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px red;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export const Button = styled.button`
  background-color: ${props => props.theme === 'dark' ? '#e47068':'#F6e7e3'};
  color: ${props => props.theme === 'dark' ? '#F6e7e3':'#e47068'};
  width: ${props => props.largura };
  padding: 5px;
  border: ${props => props.theme === 'dark' ? '6px solid #F6e7e3':'6px solid #e47068'};
  border-radius: 5px;

  &:hover{
    background-color: ${props => props.theme === 'dark' ? '#F6e7e3':'#e47068'};
    color: ${props => props.theme === 'dark' ? '#e47068':'#F6e7e3'};
    border: ${props => props.theme === 'dark' ? '6px solid #e47068':'6px solid #F6e7e3'};
  }
`;

export const Button2 = styled.button`
  background-color: ${props => props.theme == 'dark' ? '#222222':'#dddddd'};
  color: ${props => props.theme == 'dark' ? '#dddddd':'#222222'};
  width: 200px;
  padding: 10px;
  border: ${props => props.theme == 'dark' ? '6px solid #dddddd':'6px solid #222222'};
  border-radius: 5px;
`;