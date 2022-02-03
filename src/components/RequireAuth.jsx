import {Navigate} from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';
import { api } from '../helpers/SiteAPI';
import { Context } from '../contexts/Context';
import { useNavigate, Link, useParams } from 'react-router-dom'


export const RequireAuth = ({children}) => {

  const [isAuth, setIsAuth] = useState(true);  
  const {state, dispatch} = useContext(Context);
  const [ok, setOk] = useState(true);
  const params = useParams();

  useEffect(() => {
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
        } else {
          alert("EEREEEE: ", result.errors)                    
          setIsAuth(false);
        }
      } else {
        setIsAuth(false);
      }
    }
    checkLogin()
  },[])

  // if(isAuth) {
  //   console.log("ENTROUUUU, assa2", isAuth)
  //   console.log("entrou d sdk222, ", children);
  //   return children;
  // } else {    
  //   console.log("ENTROUUUU, ass3", isAuth)
  //   return <Navigate to="/login"/>;
  // }
  return (
    <>
      {isAuth &&
        <div id={params.id}>       
          {children}
        </div>
      }
      {!isAuth &&
        <Navigate to="/login"/>
      }
    </>
  )  

}