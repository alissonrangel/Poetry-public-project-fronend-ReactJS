import React, { useContext, useEffect, useState} from 'react';

import {Button} from '../components/Button';

import {Link, useNavigate} from 'react-router-dom';

import styled from 'styled-components';

import { Context } from '../contexts/Context';

import {api} from '../helpers/SiteAPI';

import logo from '../assets/images/logo.png';

const Header2 = styled.header`
  /* background-color: #fff000; */
  color: ${props => props.theme === 'dark' ? '#F6e7e3':'#e47068'};
  padding: 10px;
  background-color: ${props => props.theme === 'dark' ? '#e47068':'#F6e7e3'};
  border-top: ${props => props.theme === 'dark' ? '2px solid #F6e7e3':'2px solid #e47068'};
  border-bottom: '2px solid #e47068';
  border-left: '2px solid #e47068';
  border-right: '2px solid #e47068';
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const User = styled.a`
  /* background-color: ${props => props.theme == 'dark' ? '#e47068':'#F6e7e3'}; */
  color: ${props => props.theme === 'dark' ? '#F6e7e3':'#e47068'};
  width: ${props => props.largura };
  /* padding: 5px; */
  /* border: ${props => props.theme == 'dark' ? '6px solid #F6e7e3':'6px solid #e47068'}; */
  border-radius: 5px; 
`

const Logo = styled.img`
  width: 150px;
  border-radius: 5px; 
`

export const Header = () => {

  const {state, dispatch} = useContext(Context);   
  const [error, setError] = useState([]);
  const [isLog, setIsLog] = useState();

  const navigate = useNavigate();

  const handleThemeClick = () => {
    if (state.theme.status === 'dark') {
      dispatch({
        type: "CHANGE_STATUS",
        payload: { status: "light"}
      })
    } else {
      dispatch({
        type: "CHANGE_STATUS",
        payload: { status: "dark"}
      })
    }
  }

  const logoutClick = async() => {
    
    let result = await api.logout(state.user.uid, state.user.client, state.user.accessToken);

    console.log("DDDDDDD, ", result);
    if (result.success === true) {
      dispatch({
        type: "RESET_DADOS"      
      })
      localStorage.clear()
      setIsLog(false);  
    } else {
      setError(result.errors);      
      alert('hgfhhh '+result.errors[0]);
      setIsLog(true); 
    }
    // setIsLogin(false);
    navigate('/');
  }

  useEffect(() => {
    const validate = async () => {
      if (api.getToken()) {
        const result = await api.validateToken()
        if(result.success){
          console.log('RESULT: ', result.data);
          dispatch({
            type: "CHANGE_DADOS", 
            payload: {
              client: localStorage.getItem('client'),
              accessToken: localStorage.getItem('access-token'),
              uid: localStorage.getItem('uid')
            }
          })
          dispatch({
            type: "CHANGE_NAME", 
            payload: {
              name: result.data.name
            }
          })
          dispatch({
            type: "CHANGE_EMAIL", 
            payload: {
              email: result.data.email
            }
          })   
        } else {
          console.log('RESULT FALSE: ', result);
        }
      }
    }
    validate();
  },[])

  useEffect(() => {
    console.log("is Log, ", isLog);
    console.log("CCDCDDCDCDCDCDD Header loc stor: ",localStorage.getItem('access-token'));
  },[isLog])

  return (
    <>      
      <Header2 theme={state.theme.status} className={`box flex flex-row justify-around items-center`}>
          
          <Link to="/"><Logo src={logo} alt="Logo do site" /></Link>
          {/* { state.user.name === "" &&
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Cadastre-se</Link>
            </>
          }         */}
          {/* { state.user.name !== "" &&
            <Button onClick={logoutClick}>Logout</Button>                    
          } */}
          { localStorage.getItem('access-token') === null &&
            <>
              <Link to="/login">Login</Link>
              {/* <Link to="/signup">Cadastre-se</Link> */}
            </>
          }                              
          <button onClick={handleThemeClick}>Mudar Thema</button>                           
          { localStorage.getItem('access-token') !== null &&
            <> 
              <User theme={state.theme.status} className={`flex flex-row content-center`} ><h3>{state.user.name + ' '+ state.user.email}</h3></User>     
              <Link to="/adicionar-poesia"><Button theme={`${state.theme.status}`} largura="150px"  >Adicionar Poesia</Button></Link>           
              <Button onClick={logoutClick}>Logout</Button>                    
            </>
          }
        </Header2>                     
    </>
  )

}