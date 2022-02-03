import { createContext, useReducer} from 'react';

import { userInitialState, userReducer } from '../reducers/userReducer';
// 
import { themeInitialState, themeReducer } from '../reducers/themeReducer';

const initialState = {
  user: userInitialState,
  //
  theme: themeInitialState
}

export const Context = createContext({
  state: initialState,
  dispatch: () => null
});

const mainReducer = (state, action) => ({
  user: userReducer(state.user, action),
  //     
  theme: themeReducer(state.theme, action)
})

export const ContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <Context.Provider value={{state, dispatch}} >{children}</Context.Provider>
  );
}
