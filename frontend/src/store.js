import { configureStore, createSlice } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const userSlice = createSlice({
    name: 'user',
    initialState: { value: null },
    reducers: {
      setGlobalUser: (state, action) => {
        state.value = action.payload;
      },
    },
  });
  
  export const { setGlobalUser } = userSlice.actions;
  
  const store = configureStore({
    reducer: {
      user: userSlice.reducer,
      // Add more reducers as needed
    },
  });
  
  export default store;
