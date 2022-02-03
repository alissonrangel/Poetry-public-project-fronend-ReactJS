import React, {useState, useEffect, useContext} from 'react';
import {PostPoetryForm} from '../../components/PostPoetryForm';
import {api} from '../../helpers/SiteAPI';
import { useNavigate, Link, useParams, Navigate } from 'react-router-dom'
import {Button} from '../../components/Button';
import {Context} from '../../contexts/Context';
import styled from 'styled-components';


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

function EditPoetry() {

  const params = useParams();

  const {state, dispatch} = useContext(Context);   

  const [isAuth, setIsAuth] = useState(false);  
  
  const [id, setId] = useState(params.id);
  
  
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [poetry, setPoetry] = useState({});


  const [addTitleText, setAddTitleText] = useState('');
  const [addBodyText, setAddBodyText] = useState('');

  const getUsers = async () => {
    const data = await api.getUsersIdAndNames();
    console.log("ENTROUuuu0, ", data);
    setUsers(data);
  }

  const handleTitle = (e) => {
    setAddTitleText(e.target.value);
  }

  const handleBody = (e) => {
    setAddBodyText(e.target.value);
  }

  const getPoetry = async() => { 
    console.log("PARAMS ID: " + params.id);
       
    let json = await api.getPoetry2(params.id, state.user.uid, state.user.client, state.user.accessToken);
    console.log("JSON22: " + json);
    if ( json.error !== 'true' ){
      setAddTitleText(json.title);
      setAddBodyText(json.body);
      await setPoetry(json);
    } else {
      navigate('/');
    } 
  }

  useEffect(() => {
    if (api.getToken()) {
      getPoetry()
    } else {
      navigate('/');
    }

    const checkLogin = async () => { 
      if (api.getToken()) {
        const result = await api.validateToken()
        console.log("RESULT, ", result);
        if (result.success === true) {  
          setIsAuth(true);        
          console.log("ENTROUUUU, assa", isAuth);
          let accessToken = localStorage.getItem('access-token')
          let uid = localStorage.getItem('uid')
          let client = localStorage.getItem('client')
          dispatch({
            type: "CHANGE_DADOS", 
            payload: {
              client, 
              accessToken,
              uid
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
          setIsAuth(true)        
        } else {
          setIsAuth(false);
        }
      } else {
        setIsAuth(false);
      }
    }
    checkLogin()
  },[])

  const handleAddClick = async (e) => {    

    e.preventDefault();

    let json;
    let body = {
      title: addTitleText,
      body: addBodyText,
      image_url: poetry.image_url,
      image_name: poetry.image_name
    }

    json = await api.updatePoetry(body, state.user.uid, state.user.client, state.user.accessToken, e.currentTarget, params.id);
    
    console.log("JSONNN, ", json);
    if (json.id) {      
      alert("Poesia editada com sucesso!");
      navigate('/');
    } else {
      alert("Ocorreu algum erro!");
    }
  }

  return (
    <>
      {
        isAuth &&
        <>
          <Link to='/'><Button theme={state.theme.status} >Voltar</Button></Link>
          <div style={{display:'flex', justifyContent:'center'}}>
            <Fieldset  theme={state.theme.status} >
              <legend >Editar Poesia</legend>
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
                <Button type="submit" theme={state.theme.status} >Editar Poesia</Button>
              </form>                
            </Fieldset>
          </div>
        </>
      }
      {/* {
        !isAuth && 
        <Navigate to="/"/>
      }       */}
    </>
  );
}

export default EditPoetry;
