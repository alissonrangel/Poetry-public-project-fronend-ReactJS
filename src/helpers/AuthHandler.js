//Verifica se usuario esta logado
//vai logar o usuario
//vai deslogar o usuario
// import Cookies from 'js-cookie';
import React, { useState, useContext, useEffect } from 'react';

export const isLogged = async () => {
  //let token = Cookies.get('token');
  
  let accessToken = localStorage.getItem('access-token');
  let client = localStorage.getItem('client');
  let uid = localStorage.getItem('uid');
  
  let objetoDeRetorno = {}
  let x = "";
  let result = await fetch(`http://localhost:3000/auth/validate_token`,{
    headers:{        
      'uid': uid,
      'client': client,
      'access_token': accessToken
    }
  }).then((resp)=>{    
    //if (resp.success === true) {           
      resp.headers.forEach(
      function(Value, Header) { 
        x= x + Header + "\n" + Value + "\n\n"; 
        if (Header === 'access-token') {
          objetoDeRetorno.accessToken = Value;
        }
        if (Header === 'client') {
          objetoDeRetorno.client = Value;
        }
        if (Header === 'uid') {
          objetoDeRetorno.uid = Value;
        }
      });
    //}
    return resp.json();
  });
  //let json = await result.json();

  return {...result, objetoDeRetorno, x};   
}

export const doLogin = (accessToken, client, uid) => {
  // if ( rememberPassword ){
  //   Cookies.set('token', token, { expires:999 });
  // } else {
  //   Cookies.set('token', token);
  // }
  

  localStorage.setItem("access-token", accessToken);
  localStorage.setItem("client", client);
  localStorage.setItem("uid", uid);
}

export const doLogout = () => {
  // Cookies.remove('token');
}