import React, { useState , useEffect, useContext} from 'react';
import {PoetryItem} from '../../components/PoetryItem';

import {api} from '../../helpers/SiteAPI';
import {Link} from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../../assets/images/8707-loading.json';

import { Context } from '../../contexts/Context';

import {Button} from '../../components/Button';

import {isLogged} from '../../helpers/AuthHandler';

function Home() {
  
  const {state, dispatch} = useContext(Context);   

  const [poetries, setPoetries] = useState([]); 
  const [loading, setLoading] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderedSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const loadPoetries = async() => {
    setLoading(true);
    let json = await api.getAllPoetries();
    console.log("ALL POETRIEs: ",json);
    setLoading(false); 
    setPoetries(json);
    // setTimeout(() => {
    //   setLoading(false); 
    //   setPoetries(json);
    // }, 2000);               
  }

  useEffect(() => {
    // let auth = async ()=>{
    //   let retorno = await isLogged();
    //   console.log("IS LOGGED: ", retorno);   
      
    //   if (retorno.success === true) {
        
    //   }
    // }
    // auth();
    loadPoetries();
  }, []);

  const getPoetry = ()=>{

  }

  return (
    <div>
        {loading && 
          <Lottie options={defaultOptions}
          height={400}
          width={400}
          isStopped={false}
          isPaused={false} />          
        } 

        {!loading && poetries.length > 0 &&
          <div style={{display: 'flex', flexWrap:'wrap'}}>
            {poetries.map((item, index)=>(              
                <PoetryItem key={index} data={item} author={item.user.name} tela="home" />                              
            ))}
          </div>
        }

        {!loading && poetries.length === 0 && 
          <div>Tente mais tarde novamente</div>
        }
    </div>
  );
}

export default Home;
