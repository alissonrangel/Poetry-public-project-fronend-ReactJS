import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import {Context} from '../../contexts/Context';
import {api} from '../../helpers/SiteAPI';
import {useSearchParams, useNavigate, Link} from 'react-router-dom';

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

const SignIn = () => {

  const navigate = useNavigate();


  const {state, dispatch} = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState([]);

  useEffect(() => {
    console.log("Confirmation: ",searchParams.get('account_confirmation_success'));
    setConfirmation(searchParams.get('account_confirmation_success'));
    setTimeout(() => {
      setConfirmation(false);
    }, 3000);
  },[])

  const changeEmail = (e) => {
    setEmail(e.target.value);
  }

  const changePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleClick = async(e) => {
    e.preventDefault();
    let result = {};

    if (!email || !password) {
      alert("Preencha seus dados!");
      setError(["Preencha seus dados!"]);
      setTimeout(() => {
        setError([]);
      }, 5000);
    } else {
      
      result = await api.login(email, password);
    
    
      console.log("fadaad, ", result);
      if (result.success === false) {
        setError(result.errors);
        setTimeout(() => {
          setError([]);
        }, 5000);
      } else {
        console.log("AQUI:, ", result);
        localStorage.setItem("access-token", result.objetoDeRetorno.accessToken);
        localStorage.setItem("client", result.objetoDeRetorno.client);
        localStorage.setItem("uid", result.objetoDeRetorno.uid);
        dispatch({
          type: "CHANGE_DADOS", 
          payload: {
            client: result.objetoDeRetorno.client,
            accessToken: result.objetoDeRetorno.accessToken,
            uid: result.objetoDeRetorno.uid
          }
        })
        dispatch({
          type: "CHANGE_NAME", 
          payload: {
            name: result.json.data.name
          }
        })
        dispatch({
          type: "CHANGE_EMAIL", 
          payload: {
            email: result.json.data.email
          }
        })
        navigate('/');
      }  
    }
      //result = await api.login(email, password);
      
    console.log("RESULT click Sign In: ",result);           
  }

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      {confirmation && 
        <h3>Conta Confirmada Com Sucesso</h3>
      }
      {
        error.length > 0 &&
        error.map((it, index)=>(
          <h3 key={index}>{it}</h3>
        ))
      }
      <Fieldset  theme={state.theme.status} >
        <legend >Fazer o Login</legend>
        <form onSubmit={handleClick} style={{display:'flex', flexDirection:'column'}}>          
          <Input
            theme={state.theme.status}
            value={email}
            onChange={ changeEmail }
            type="email"            
            placeholder="Digite seu e-mail"
          />
          <Input
            theme={state.theme.status}
            value={password}
            onChange={ changePassword }
            type="password"            
            placeholder="Digite sua senha"
          />          
          <Button type="submit" theme={state.theme.status} >Login</Button>
        </form>                
      </Fieldset>
    </div>
  )

}

export default SignIn;