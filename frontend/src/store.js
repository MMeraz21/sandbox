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

  const persistConfig = {
    key: 'root',
    storage,
  }

  const rootReducer = combineReducers({
    user: userSlice.reducer,
  })
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)


  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
          ignoredPaths: ['register'],
        }
      })
    // reducer: {
    //   user: userSlice.reducer,
    //   // Add more reducers as needed
    // },
  })

  const persistor = persistStore(store)
  
  // export default store;

  export{ store, persistor}
