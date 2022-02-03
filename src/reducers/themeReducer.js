export const themeInitialState = {
  status: 'dark' | 'light',
  fontText: "'Open Sans', 'Helvetica Neue', sans-serif" | "serif"
}

export const themeReducer = (state, action) => {

  switch (action.type) {
    case 'CHANGE_STATUS':
      return {...state, status: action.payload.status};
    break;
    case 'CHANGE_FONT':
      return {...state, status: action.payload.fontText};
    break;       
  }
  return state;
}