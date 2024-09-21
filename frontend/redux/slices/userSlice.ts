import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUserState } from '../types/UserTypes'
import { RootState } from '../store'

const initialState: IUserState = {
  userData: {},
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.userData = action.payload
    }
  },
})

export const userState = (state:RootState) => state.userReducer

// Action creators are generated for each case reducer function
export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer