import styled from 'styled-components';
import React, { useContext, useEffect, useState} from 'react';
import { Context } from '../contexts/Context';

const Footer2 = styled.footer`
/* background-color: #fff000; */
color: ${props => props.theme === 'dark' ? '#F6e7e3':'#e47068'};
padding: 10px;
background-color: ${props => props.theme === 'dark' ? '#e47068':'#F6e7e3'};
border: ${props => props.theme === 'dark' ? '2px solid #F6e7e3':'2px solid #e47068'};
border-radius: 10px;
display: flex;
flex-direction: column;
align-items: center;
`;

const Developer = styled.a`
/* background-color: ${props => props.theme == 'dark' ? '#e47068':'#F6e7e3'}; */
color: ${props => props.theme === 'dark' ? '#F6e7e3':'#e47068'};
width: ${props => props.largura };
/* padding: 5px; */
/* border: ${props => props.theme == 'dark' ? '6px solid #F6e7e3':'6px solid #e47068'}; */
border-radius: 5px; 
`

function Footer(){
  const {state, dispatch} = useContext(Context);   

  return (
    <>
      <Footer2 theme={state.theme.status}>
        <h4>Web Developer - Alisson Rangel</h4>                
        <h4><Developer theme={`${state.theme.status}`} href="mailto:ac.manager.2021@gmail.com">ac.manager.2021@gmail.com</Developer> </h4>
      </Footer2>
    </>
  );

};

export default Footer;