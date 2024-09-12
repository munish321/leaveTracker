import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
interface IState {
  loading: boolean
}
const initialState:IState={
  loading:false
}
export const LoaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers:{
     isLoading:(state,action:PayloadAction<boolean>)=>{
      state.loading = action.payload
     }
  }
})

export const loaderState = (state:RootState) => state.loaderReducer
export const {isLoading} = LoaderSlice.actions
export default LoaderSlice.reducer