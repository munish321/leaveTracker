"use client"
import React, { useState } from 'react'
import {AdminLayout} from '../layout/adminLayout'
import { Button } from '@/components/ui/button';
import {RequestLeave} from '@/components/Dialogs/RequestLeaveDialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function Leave() {
  const [leavePopup, setLeavePopup]= useState(false)
  const products = [
    {code: 'f230fh0g3', name: 'Bamboo Watch', category: 'Accessories', quantity: 24, price: 65},
    {code: 'nvklal433', name: 'Black Watch', category: 'Accessories', quantity: 32, price: 72},
    {code: 'zz21ab32x', name: 'Blue Band', category: 'Fitness', quantity: 32, price: 72},
   ]
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
      <RequestLeave visible={leavePopup} onClose={handlePopUp} />
      </div>
      <div className="card">
            <DataTable value={products} showGridlines={true} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name"></Column>
                <Column field="email" header="E-Mail"></Column>
                <Column field="role" header="Role"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>
        </div>
    </AdminLayout>
    
  )
}

export default Leave;