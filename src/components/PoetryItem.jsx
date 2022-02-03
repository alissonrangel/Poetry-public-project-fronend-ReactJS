import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { Button } from './Button';
import React, { useState , useEffect, useContext} from 'react';
import { Context } from '../contexts/Context';


const ContainerItem = styled.div`
  /* background-color: #F6d7d3; */
  width: 400px;
  /* border: 3px solid #e47068; */
  margin: 30px auto;
  padding: 10px;
  border-radius: 10px; 
  box-shadow: 2px 2px 10px ${props => props.theme === 'dark' ? '#F6e7e3':'#e47068'};;  

  background-color: ${props => props.theme === 'dark' ? '#e47068':'#F6e7e3'};
  color: ${props => props.theme === 'dark' ? '#F6e7e3':'#e47068'};
  border: ${props => props.theme === 'dark' ? '3px solid #F6e7e3':'6px solid #e47068'};
`;

const InfoItem = styled.h4`
  /* color: #e46058; */
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const TitleItem = styled.h3`
  /* color: #e47068; */
  font-weight: bold;
  text-align: center;
`

const BodyItem = styled.pre`
  /* color: #e47068; */
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
  text-align: center;
`

export const PoetryItem = ({data, author, tela}) => {
  const {state, dispatch} = useContext(Context)   

  const [name, setName] = useState('')

  useEffect(() => {
    console.log("STATE ", data);
    //alert("aaaaaa")
    //alert(data.user.email)
    //setName(data.user.name)
  },[])
  return (
    <>      
      <ContainerItem theme={`${state.theme.status}`} className="poetryitem1">
        { tela === 'poetry' &&
          <div className="poetryitem0">
            <img src={data.image_url} alt={data.image_name} />
          </div> 
        }
        <InfoItem className="mb-2"><span>{`Poesia Id: ${data.id}`}</span><span>Usuário: {author}</span></InfoItem>
        <TitleItem className="mb-2">{data.title}</TitleItem>          
        <BodyItem className="mb-2" className={tela === 'home' ? 'bodyitem':''}>{data.body}</BodyItem>
        <div className="poetryitem2">
        {
          tela === 'home' && 
          <Link to={`/poetries/${data.id}`}><Button theme={`${state.theme.status}`} largura="100px" >Detalhes</Button></Link>
        }
        
        {/* { data.user.email === state.user.email && */}
          <Link to={`/updatepoetry/${data.id}`}><Button theme={`${state.theme.status}`} largura="100px" >Editar</Button></Link>
        {/* } */}
        </div>
      </ContainerItem>                      
    </>
  )

}