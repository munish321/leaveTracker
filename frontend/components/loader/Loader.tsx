import React from 'react'
import "./loader.css"
import {loaderState} from "@/redux/slices/loaderSlice"
import { useSelector } from 'react-redux'

export const Loader=()=>{
  const state = useSelector(loaderState)
  return <>
    {state.loading && <div className="wrap">
        <div className="bounceball"></div>
        <div className="text">LOADING...</div>
    </div>}
    </>
}
