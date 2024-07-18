import { configureStore, createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit';

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

  const persisConfig = {
    key: 'root',
    storage,
  }

  const rootReducer = combineReducers({
    user: userSlice.reducer,
  })
  
  const store = configureStore({
    reducer: {
      user: userSlice.reducer,
      // Add more reducers as needed
    },
  });
  
  export default store;
