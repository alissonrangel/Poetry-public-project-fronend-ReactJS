import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import {Context} from '../contexts/Context';


const Fieldset = styled.fieldset`
  background-color: ${props => props.theme === 'dark' ? '#e47068':'#F6e7e3'};
  color: ${props => props.theme === 'dark' ? '#F6e7e3':'#e47068'};
  border: ${props => props.theme === 'dark' ? '1px solid #F6e7e3':'1px solid #e47068'};

  width: 400px;
  padding: 20px;
  /* background-color: #F6e7e3; */
  /* color: #e47068; */
  /* border: 1px solid #e47068; */
  outline: none;
  border-radius: 10px;
`

const Input = styled.input`
  background-color: ${props => props.theme === 'dark' ? '#e47068':'#F6e7e3'};
  color: ${props => props.theme === 'dark' ? '#F6e7e3':'#e47068'};
  border: ${props => props.theme === 'dark' ? '1px solid #F6e7e3':'1px solid #e47068'};

  padding: 10px;
  /* background-color: #F6e7e3;
  color: #e47068;
  border: 1px solid #e47068; */
  outline: none;
  border-radius: 10px;
  margin-bottom: 10px;
`

const TextArea = styled.textarea`
  background-color: ${props => props.theme === 'dark' ? '#e47068':'#F6e7e3'};
  color: ${props => props.theme === 'dark' ? '#F6e7e3':'#e47068'};
  border: ${props => props.theme === 'dark' ? '1px solid #F6e7e3':'1px solid #e47068'};

  padding: 10px;
  height: 400px;
  /* background-color: #F6e7e3;
  color: #e47068;
  border: 1px solid #e47068; */
  outline: none;  
  border-radius: 10px;
  margin-bottom: 10px;
`

const InputFile = styled.input`
  background-color: ${props => props.theme === 'dark' ? '#e47068':'#F6e7e3'};
  color: ${props => props.theme === 'dark' ? '#F6e7e3':'#e47068'};
  border: ${props => props.theme === 'dark' ? '1px solid #F6e7e3':'1px solid #e47068'};
  padding: 10px;
  outline: none;  
  border-radius: 10px;
  margin-bottom: 10px;
`


const Select = styled.select`
  background-color: ${props => props.theme === 'dark' ? '#e47068':'#F6e7e3'};
  color: ${props => props.theme === 'dark' ? '#F6e7e3':'#e47068'};
  border: ${props => props.theme === 'dark' ? '6px solid #F6e7e3':'6px solid #e47068'};

  padding: 10px;
  background-color: #F6e7e3;
  color: #e47068;
  border: 1px solid #e47068;
  outline: none;  
  border-radius: 10px;
  margin-bottom: 10px;
`
const Button = styled.button`
  background-color: ${props => props.theme === 'dark' ? '#e47068':'#F6e7e3'};
  color: ${props => props.theme === 'dark' ? '#F6e7e3':'#e47068'};
  border: ${props => props.theme === 'dark' ? '6px solid #F6e7e3':'6px solid #e47068'};
  width: ${props => props.largura };
  /* padding: 5px; */  
  border-radius: 5px;

  &:hover{
    background-color: ${props => props.theme === 'dark' ? '#F6e7e3':'#e47068'};
    color: ${props => props.theme === 'dark' ? '#e47068':'#F6e7e3'};
    border: ${props => props.theme === 'dark' ? '6px solid #e47068':'6px solid #F6e7e3'};
  }
`

export const PostPoetryForm = ({onAdd, ids}) => {

  const {state, dispatch} = useContext(Context);

  const [addTitleText, setAddTitleText] = useState('');
  const [addBodyText, setAddBodyText] = useState('');
  // const [addUserId, setAddUserId] = useState('0');

  

  const handleTitle = (e) => {
    setAddTitleText(e.target.value);
  }

  const handleBody = (e) => {
    setAddBodyText(e.target.value);
  }

  const handleAddClick = (e) => {
    e.preventDefault();

    if (!addBodyText || !addTitleText){
      alert("Digite os dados!");
    } else {            
      onAdd(addTitleText, addBodyText, e.currentTarget);      
    }    
  }

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <Fieldset  theme={state.theme.status} >
        <legend >Adicionar Nova Poesia</legend>
        <form onSubmit={handleAddClick} style={{display:'flex', flexDirection:'column'}}>          
          <Input
            theme={state.theme.status}
            value={addTitleText}
            onChange={ handleTitle }
            type="text"
            className=""
            placeholder="Digite um título"
          />
          <TextArea
            theme={state.theme.status}
            value={addBodyText}
            onChange={ handleBody }
            type="text"
            className=""
            placeholder="Digite a poesia"
          />
          <InputFile
            theme={state.theme.status} 
            type="file" 
            name="image"
          />
          {/* <Select theme={state.theme.status} value={addUserId} onChange={(e)=>{setAddUserId(e.target.value)}}>
            <option value="0">Escolha o autor</option>
            {
              ids && ids.map((item, index)=>(
                <option key={index} value={item.id} >{item.name}</option>
              ))
            }

          </Select> */}
          <Button type="submit" theme={state.theme.status} >Adicionar Poesia</Button>
        </form>                
      </Fieldset>
    </div>
  )

}