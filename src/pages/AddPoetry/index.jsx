import React, {useState, useEffect, useContext} from 'react';
import {PostPoetryForm} from '../../components/PostPoetryForm';
import {api} from '../../helpers/SiteAPI';
import { useNavigate, Link, useParams } from 'react-router-dom'
import {Button} from '../../components/Button';
import {Context} from '../../contexts/Context';


function AddPoetry() {

  const {state, dispatch} = useContext(Context);   
  
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [poetry, setPoetry] = useState({});

  const params = useParams();

  const getUsers = async () => {
    const data = await api.getUsersIdAndNames();
    console.log("ENTROUuuu0, ", data);
    setUsers(data);
  }

  // const getPoetry = async() => { 
  //   console.log("PARAMS ID: " + id);
       
  //   let json = await api.getPoetry(id);
  //   console.log("JSON: " + json.title);  
  //   setPoetry(json);
  // }
  
  // useEffect(() => {
  //   getPoetry();  
  //   getUsers();
  //   console.log("ENTROUuuu, ", users);
  // }, [])

  const handleAddPoetry = async (title, body, file2) => {    

    let json;

    
    json = await api.addNewPoetry(title, body, state.user.uid, state.user.client, state.user.accessToken, file2);
     
    console.log("JSONNN, ", json);
    if (json.id) {      
      alert("Poesia adicionada com sucesso!");
      navigate('/');
    } else {
      alert("Ocorreu algum erro!");
    }
  }

  return (
    <>
      <Link to='/'><Button theme={state.theme.status} >Voltar</Button></Link>
      <PostPoetryForm onAdd={handleAddPoetry} ids={users} data={poetry} />
    </>
  );
}

export default AddPoetry;
