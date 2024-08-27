"use client"
import React, { useState } from 'react'
import {AdminLayout} from '../layout/adminLayout'
import { Button } from '@/components/ui/button';
import {RequestLeave} from '@/components/Dialogs/RequestLeaveDialog';
function Leave() {
  const [leavePopup, setLeavePopup]= useState(false)
  const handlePopUp=()=>{
    setLeavePopup(!leavePopup)
  }
  const openDialog = () => {
    setLeavePopup(true)
  }
  return (
    <AdminLayout>
      <div className='flex justify-between mt-2'>
      <h1>Hello, Munish</h1>
      <Button onClick={openDialog}>Request Leave</Button>
      </div>
      <RequestLeave visible={leavePopup} onClose={handlePopUp} />
    </AdminLayout>
    
  )
}

export default Leave;