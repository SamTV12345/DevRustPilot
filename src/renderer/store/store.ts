import { configureStore } from '@reduxjs/toolkit'
import { jwtReducer } from '../jwt/JWTReducer';
import { utfReducer } from '../converter/UTFConverterSlice';
import { personReducer } from '../generate/PersonSlice';
import { dockerReducer } from '../docker/DockerSlice';
import { alertReducer } from '../alerts/AlertReducer';
import {ModalSlice} from "../modals/ModalSlice";
import {NativeGUIReducer} from "../linuxgui/NativeGUISlice";

export let store = configureStore({
  reducer: {
    jwt: jwtReducer,
    utfReducer: utfReducer,
    personReducer: personReducer,
    dockerReducer,
    alertReducer,
    nativeGUIReducer: NativeGUIReducer,
    modalReducer: ModalSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
