import { configureStore } from "@reduxjs/toolkit"
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import userReducer from './reducers/userSlice'

const store = configureStore({
    reducer: {
        userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store