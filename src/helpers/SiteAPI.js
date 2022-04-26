import axios from 'axios';
import * as Photos from '../services/photos';

const BASEAPI = `https://agua-de-coco-e-poesia.herokuapp.com`;

export const api = {

  getToken: () => {
    return localStorage.getItem('access-token')
  },
  validateToken: async () => {
    let accessToken = localStorage.getItem('access-token')
    let uid = localStorage.getItem('uid')
    let client = localStorage.getItem('client')
    
    let response = await fetch(`${BASEAPI}/auth/validate_token`,{
      headers:{
        'uid': uid,
        'client': client,
        'access_token': accessToken
      }
    })    
    let json = await response.json();
    return json;
  },
  logout: async (uid, client, accessToken) => {    
    let response = await fetch(`${BASEAPI}/auth/sign_out`, {
      method: 'DELETE',      
      headers:{        
        'uid': uid,
        'client': client,
        'access_token': accessToken
      }
    });
    let json = await response.json();
    return json;
  },
  signup: async (email, password, password_confirmation, name) => {    
    
    
    let response = await fetch(`${BASEAPI}/auth`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        password_confirmation,
        name
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    
    let json = await response.json();

    if (json.success === false){
      return json;
    }
    
    return json;
  },

  login: async (email, password) => {
    // let response = await axios.post(`${BASEAPI}/auth/sign_in`, {
    //   email,
    //   password
    // });
    // console.log("RESPONSE api login, ", response);
    // return response;
    let objetoDeRetorno = {}
    let x = "";
    let response = await fetch(`${BASEAPI}/auth/sign_in`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password        
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((resp)=>{
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
       return resp; 
    });
    let json = await response.json();

    if (json.success === false){
      return json;
    }
    
    return {success: true, json, objetoDeRetorno};
  },
  getUsersIdAndNames: async () => {
    let response = await axios.get(`${BASEAPI}/users`);
    return response.data;
  },

  getPoetry: async(id) => {
    
    /*
    let response = await fetch(`${BASEAPI}/posts/`);
    let json = await response.json();
    return json;
    */
    let response = await fetch(`${BASEAPI}/poetries/${id}`);
    let json = response.json();
    return json;
  },
  getPoetry2: async(id, uid, client, accessToken) => {
    
    let response = await fetch(`${BASEAPI}/poetries2/${id}`,{
      headers:{        
        'uid': uid,
        'client': client,
        'access_token': accessToken
      }
    });
    let json = response.json();
    return json;
  },
  getAllPoetries: async() => {
    
    
    let response = await fetch(`${BASEAPI}/poetries`);
    let json = await response.json();
    return json;
    
    // let response = await axios.get(`${BASEAPI}/poetries`);
    // return response.data
  },

  addNewPoetry: async(title, body, uid, client, accessToken, file2) => {
    
    // let response = await axios.post(`${BASEAPI}/poetries`, {
    //   title,
    //   body
    //   // user_id: userId
    // });

    // return response.data  
    let imageName = '';
    let imageUrl = ''; 
    console.log('FILE2: ', file2);
    //return {error: "Errou"};
    const formData = new FormData(file2);      
    const file = formData.get('image');
    console.log('FILE: ', file);
    //return {error: "Errou"};

    if (file.name !== '') {      
      
      if(file && file.size > 0) {
        // setUploading(true);
        let result = await Photos.insert(file);
        // setUploading(false);
        
        if(result instanceof Error) {
          alert(`${result.name} - ${result.message}`);
          return {error: 'Imagem não foi inserida!'};
        } else {          
          // newPhotoList.push(result);
          // setPhotos(newPhotoList);
          imageName = result.name;
          imageUrl = result.url;
        }

        let response = await fetch(`${BASEAPI}/poetries`, {
          method: 'POST',
          body: JSON.stringify({
            title,
            body,
            image_url: imageUrl,
            image_name: imageName,
          }),
          headers:{
            'Content-Type': 'application/json',
            'uid': uid,
            'client': client,
            'access_token': accessToken
          }
        });
        let json = await response.json();
        return json;
      } else {
        return {error: 'Imagem não foi capturada!'};
      }
    } 

    let response = await fetch(`${BASEAPI}/poetries`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        image_name: 'serafim.png',
        image_url: 'https://firebasestorage.googleapis.com/v0/b/arreactgallery.appspot.com/o/poetry_images%2Fserafim.png?alt=media&token=f62c159e-b2a3-4bd8-8ef4-f77224873a90'
      }),
      headers:{
        'Content-Type': 'application/json',
        'uid': uid,
        'client': client,
        'access_token': accessToken
      }
    });
    let json = await response.json();
    return json;
  },
  updatePoetry: async(body, uid, client, accessToken, file2, id) => {
    
    // let response = await axios.post(`${BASEAPI}/poetries`, {
    //   title,
    //   body
    //   // user_id: userId
    // });

    // return response.data  
    let body2 = {...body};
    let imageName = '';
    let imageUrl = ''; 
    console.log('FILE2: ', file2);
    //return {error: "Errou"};
    const formData = new FormData(file2);      
    const file = formData.get('image');
    console.log('FILE: ', file);
    //return {error: "Errou"};
    
    if (file.name !== '') {      
      
      if(file && file.size > 0) {
        // setUploading(true);
        let result = await Photos.insert(file);
        // setUploading(false);
        
        if(result instanceof Error) {
          alert(`${result.name} - ${result.message}`);
          return {error: 'Imagem não foi inserida!'};
        } else {          
          // newPhotoList.push(result);
          // setPhotos(newPhotoList);          
          body2.imageName = result.name;
          body2.image_url = result.url
          // imageName = result.name;
          // imageUrl = result.url;
        }

        let response = await fetch(`${BASEAPI}/poetries/${id}`, {
          method: 'PUT',
          body: JSON.stringify({            
            title: body2.title,
            body: body2.body,
            image_url: body2.image_url,
            image_name: body2.image_name   
          }),
          headers:{
            'Content-Type': 'application/json',
            'uid': uid,
            'client': client,
            'access_token': accessToken
          }
        });
        let json = await response.json();
        return json;
      } else {
        return {error: 'Imagem não foi capturada!'};
      }
    } 

    let response = await fetch(`${BASEAPI}/poetries/${id}`, {
      method: 'PUT',
      body: JSON.stringify({        
        title: body2.title,
        body: body2.body,
        image_url: body2.image_url,
        image_name: body2.image_name       
      }),
      headers:{
        'Content-Type': 'application/json',
        'uid': uid,
        'client': client,
        'access_token': accessToken
      }
    });
    let json = await response.json();
    console.log("dgakdad, ", json);
    
    return json;
  }

}

/*
const apiFetchFile = async (endpoint, body) => {
  
  let token = Cookies.get('token');

  console.log(body);
  if (token){
    console.log("Entrou");
    body.token = token;
    console.log(body);
  }
  

  //}
  console.log("BODY>TOKEN2");
  console.log(token);
  console.log(body);
  
  const res = await fetch(BASEAPI+endpoint, {
    method: 'POST',    
    headers:{
      'Authorization': token      
    },
    body
  });
  const json = await res.json();

  if ( json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
}
const apiFetchPost = async (endpoint, body) => {

  // if (!body.token){
  //   let token = Cookies.get('token');
  //   if(token){
  //     body.token = token;
  //   }
  // }

  const res = await fetch(BASEAPI+endpoint, {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(body)
  });

  const json = await res.json();

  if ( json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
}
const apiFetchPut = async (endpoint, body, id) => {

  let token = Cookies.get('token');

  const res = await fetch(`${BASEAPI+endpoint}${id}`, {
    method: 'PUT',
    headers:{
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
      'Authorization': token 
    },
    body
  });

  const json = await res.json();

  if ( json.notallowed) {
    window.location.href = '/signin';
    return;
  }

  return json;
}
const apiFetchGet = async (endpoint) => {

  // if (!body.token){
  //   let token = Cookies.get('token');
  //   if(token){
  //     body.token = token;
  //   }
  // }

  const res = await fetch(`${BASEAPI+endpoint}`); 

  const json = await res.json();

  // if ( json.notallowed) {
  //   window.location.href = '/signin';
  //   return;
  // }

  return json;
}
const apiFetchGet1 = async (endpoint, id) => {

  // if (!body.token){
  //   let token = Cookies.get('token');
  //   if(token){
  //     body.token = token;
  //   }
  // }
  console.log(`XXXXXXXXXX - ${BASEAPI+endpoint}${id.id}`);
  
  // let idd = parseInt(id);

  console.log(`XXXXXXXXXX - ${BASEAPI+endpoint}${id.id}`);

  const res = await fetch(`${BASEAPI+endpoint}${id.id}`); 

  const json = await res.json();

  // if ( json.notallowed) {
  //   window.location.href = '/signin';
  //   return;
  // }  

  console.log(json);

  return json;
}

const apiFetchGet2 = async (endpoint, tok) => {

  if (tok != 0){
        
  } else {

  }
  console.log("TOKENNNNNN : "+tok);
  

  const res = await fetch(`${BASEAPI+endpoint}`,{
      headers:{
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json',
        'Authorization': tok 
      }
    }
  ); 

  const json = await res.json();

  // if ( json.notallowed) {
  //   window.location.href = '/signin';
  //   return;
  // }

  return json;
}

const SiteAPI = {
  login: async (email, password) =>{
    // fazer consulta ao WS
    const json = await apiFetchPost(
      '/signin',
      {email, password}
    );
    return json 
    // { error: 'Funcionalidade Imcompleta'};
  },

  register: async (name, email, password)=>{
    const json = await apiFetchPost(
      '/signup',
      {name, email, password}
    );
    return json;
  },

  userInfo: async () =>{
    // fazer consulta ao WS
    const json = await apiFetchGet(
      '/user/me'
    );
    return json 
    // { error: 'Funcionalidade Imcompleta'};
  },

  userUpdate: async (name, email, password, stateLoc)=>{
    const json = await apiFetchPut(
      '/user/me',
      {name, email, password, state:stateLoc}
    );
    return json;
  },



  getPoetries: async () => {
    const json = await apiFetchGet(
      '/listpoetries'
    );
    return json;
  },

  getUser: async () => {

    let token = Cookies.get('token');
    
    console.log(token);
    
    if(token){
      console.log("Entrou aqui");
      //fData.append('Authorization', token);
    } else {
      console.log("Sem token");
      token = 0
      return;
    }

    const json = await apiFetchGet2(
      '/me',
      token
    );
    return json;
  },

  getPoetry: async (id) => {
    const json = await apiFetchGet1(
      '/poetries/',
      {id}
    );
    return json;
  },

  addPoetry: async (fData) => {
    
    let token = Cookies.get('token');
    
    console.log(token);
    if(token){
      console.log("Entrou aqui");
      //fData.append('Authorization', token);
    } else {
      console.log("Sem token");
      return;
    }
    console.log(`${fData.title} + ${fData.body}`);

    const json = await apiFetchFile(
      '/poetries',
      fData
    );
    return json;
  },

  poetryUpdate: async (fData, id)=>{
    
    let token = Cookies.get('token');
    console.log("akçmlkklxmdlknslkfnsdlml " + id);
    if(token){
      console.log("Entrou aqui 00");
      //fData.append('Authorization', token);
    } else {
      console.log("Sem token 00");
      return;
    }

    //console.log(`${fData.title} + ${fData.body} + ${fData.user_id}`);
    

    //return { error: "326"};
    
    const json = await apiFetchPut(
      '/poetries/',
      fData,
      id
    );
    return json;
  }

};
*/

//export default () => SiteAPI;