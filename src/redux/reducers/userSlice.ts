import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUser{
    email: string,
    id: string,
    is_admin: boolean,
    nome: string,
    organization_id: string,
    senha: string
}

const initialState: IUser = {
    email: '',
    id: '',
    is_admin: false,
    nome: '',
    organization_id: '',
    senha: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUserAction: (state, action: PayloadAction<IUser>) => {
            return action.payload
        }
    }
})

export const { setUserAction } = userSlice.actions
export default userSlice.reducer