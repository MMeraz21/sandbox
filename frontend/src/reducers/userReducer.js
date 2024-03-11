    const initialState = {
        user: null,
    };

  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
        };
      // Add other cases as needed
      default:
        return state;
    }
  };
  
  export default userReducer;  