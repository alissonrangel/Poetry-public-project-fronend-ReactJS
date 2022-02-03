//import logo from './logo.svg';
import './App.css';

import {RouteList} from './RouteList';

import {Header} from './components/Header';
import Footer from './components/Footer';

//import ThemeContext from './contexts/ThemeContext';
import { Context } from './contexts/Context';

import {useState, useContext, useEffect} from 'react';
import {isLogged, doLogin } from './helpers/AuthHandler';
import { api } from './helpers/SiteAPI';
import {useNavigate} from 'react-router-dom';
import { Banner } from './components/Banner';



function App() {  

  const navigate = useNavigate();
  const {state, dispatch} = useContext(Context);
  const [logado, setLogado] = useState(false);

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     if (api.getToken()) {
  //       const result = await api.validateToken()
  //       if (result.success === true) {
  //         setLogado(false)
  //         let accessToken = localStorage.getItem('access-token')
  //         let uid = localStorage.getItem('uid')
  //         let client = localStorage.getItem('client')
  //         dispatch({
  //           type: "CHANGE_DADOS", 
  //           payload: {
  //             client, 
  //             accessToken,
  //             uid
  //           }
  //         })
  //         dispatch({
  //           type: "CHANGE_NAME", 
  //           payload: {
  //             name: result.data.name
  //           }
  //         })
  //         dispatch({
  //           type: "CHANGE_EMAIL", 
  //           payload: {
  //             email: result.data.email
  //           }
  //         })        
  //       } else {
  //         alert(result.errors)          
  //         navigate('/login')
  //       }
  //     } else {
  //       navigate('/login')
  //     }
  //   }
  //   checkLogin()
  // },[])

  // useEffect(() => {
  //   let auth = async ()=>{
  //     let result = await isLogged();
  //     console.log("IS LOGGED: ", result);   
      
  //     if (result.success === true) {
  //       dispatch({
  //         type: "CHANGE_DADOS", 
  //         payload: {
  //           client: result.objetoDeRetorno.client,
  //           accessToken: result.objetoDeRetorno.accessToken,
  //           uid: result.objetoDeRetorno.uid
  //         }
  //       })
  //       dispatch({
  //         type: "CHANGE_NAME", 
  //         payload: {
  //           name: result.data.name
  //         }
  //       })
  //       dispatch({
  //         type: "CHANGE_EMAIL", 
  //         payload: {
  //           email: result.data.email
  //         }
  //       })        
  //       doLogin(result.objetoDeRetorno.accessToken, result.objetoDeRetorno.client, result.objetoDeRetorno.uid)
  //       setLogado(true)
  //     } else {
  //       alert(result.errors[0]);
  //       setLogado(false);
  //     }
  //   }
  //   console.log("STORAGE  - ,",localStorage.getItem('access-token'));
  //   if (localStorage.getItem('access-token') !== null) {
  //     auth();     
  //   } else {
  //     alert("Faça o login");
  //     setLogado(false);
  //   }    
  // }, []);

  return (
    // <ThemeContext.Provider value="light">
    //   <UserContext.Provider value={{name: userName, email: userEmail}}>
    //   <div className="box-border p-4">         
    //     <ThemeContext.Consumer>
    //       { value => (
    //         <UserContext.Consumer>{
    //           user => (
    //             <Header style={{backgroundColor: '#f00'}} className={`box theme-${value} flex flex-row justify-around items-center`}>
    //               <Link to="/adicionar-poesia"><Button dark>Adicionar Poesia</Button></Link>                    
    //               <User className={`flex flex-row content-center`} ><h3>{user.name + ' - '+ user.email}</h3></User>                    
    //             </Header>
    //           )
    //         }                
    //         </UserContext.Consumer>     
    //       )}
    //     </ThemeContext.Consumer>              
    //     <Header />
    //     <div>
    //       <RouteList />
    //     </div>            
    //   </div>
    //   </UserContext.Provider>
    // </ThemeContext.Provider>

    <div className="box-border p-0">
      <div id="approot">
        <h1>Água de coco e poesia</h1>  
      </div>
      <Banner />                                                     
      <Header />
      <div className="p-4" style={{marginTop:'20px'}}>
        <RouteList />
      </div>
      <div style={{marginTop:'20px'}}>
        <Footer />
      </div>        
    </div>      
  );
}

export default App;
