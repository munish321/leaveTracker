import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IState } from '../types/RoleType'
const initialState: IState = {
  value: 0,
}

export const roleSlice = createSlice({
  name: 'roleStore',
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    }
  },
})

export const roleState = (state: IState) => ({
  value: state.value
})
// Action creators are generated for each case reducer function
export const { setRoles } = roleSlice.actions

export default roleSlice.reducer