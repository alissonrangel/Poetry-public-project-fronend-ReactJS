export const userInitialState = {
  name: '',
  email: '',
  accessToken: '',
  uid: '',
  client: ''
}

export const userReducer = (state, action) => {

  switch (action.type) {
    case 'CHANGE_NAME':
      return {...state, name: action.payload.name};
    break;
    case 'CHANGE_EMAIL':
      return {...state, email: action.payload.email};
    break;
    case 'CHANGE_DADOS':
      return {...state, accessToken: action.payload.accessToken, client: action.payload.client, uid: action.payload.uid};
    break;
    case 'RESET_DADOS':
      return userInitialState;
    break;    
  }
  return state;
}