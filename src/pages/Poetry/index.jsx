import React, {useState, useEffect, useContext} from 'react';
import {PoetryItem} from '../../components/PoetryItem';
import {api} from '../../helpers/SiteAPI';
import { useNavigate, Link, useParams } from 'react-router-dom'
import {Button} from '../../components/Button';
import {Context} from '../../contexts/Context';

function Poetry() {
  const {state, dispatch} = useContext(Context);   
  
  const params = useParams();
  const navigate = useNavigate();

  const [poetry, setPoetry] = useState({});
  const [author, setAuthor] = useState('');

  const loadPoetry = async() => { 
    console.log("PARAMS ID: " + params.id);
       
    let json = await api.getPoetry(params.id);
    console.log("JSON: " + json.user.name);      
    
    setAuthor(json.user.name)
    setPoetry(json);
  }

  useEffect(() => {    
    loadPoetry();
  }, []);

  return (
    <div>
      <Link to='/'><Button theme={state.theme.status} >Voltar</Button></Link>  
      <PoetryItem data={poetry} author={author} tela="poetry"/>         
    </div>
  );
}

export default Poetry;
