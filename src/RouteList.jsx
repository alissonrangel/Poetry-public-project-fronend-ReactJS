import {Route, Routes, Link} from 'react-router-dom';


import Home from './pages/Home';
import AddPoetry from './pages/AddPoetry';
import EditPoetry from './pages/EditPoetry';
import Poetry from './pages/Poetry';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import {RequireAuth} from './components/RequireAuth';

export const RouteList = ({poetry_id}) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/adicionar-poesia" element={<RequireAuth><AddPoetry /></RequireAuth>} />
        <Route path="/poetries/:id" element={<Poetry />} />
        <Route path="/updatepoetry/:id" element={<EditPoetry />} />
        <Route path="*" element={<NotFound />} />        
      </Routes>
    </>  
  )
}