"use client"
import {AdminLayout} from '../layout/adminLayout'
import { Button } from '@/components/ui/button'
import {CreateEmployeeDialog} from "@/components/Dialogs/CreateEmployeeDialog"
import { useSelector } from 'react-redux'
import {useEffect, useState} from 'react'
import { userState } from '@/redux/slices/userSlice'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { userList } from '@/service/userService'
function AdminDashboard() {
 const [createEmployee, setCreateEmployee] = useState(false)
 const { userData } = useSelector(userState)
 const { data, isLoading } = userList()
 const products = [
  {code: 'f230fh0g3', name: 'Bamboo Watch', category: 'Accessories', quantity: 24, price: 65},
  {code: 'nvklal433', name: 'Black Watch', category: 'Accessories', quantity: 32, price: 72},
  {code: 'zz21ab32x', name: 'Blue Band', category: 'Fitness', quantity: 32, price: 72},
 ]

  return (
    <AdminLayout>
     <div className='flex justify-between pt-2'>
      <h1>Welcome, {userData?.name}</h1>
      <Button onClick={() => setCreateEmployee(true)}>Create Employee</Button>
     </div>
     {createEmployee && <CreateEmployeeDialog  visible={createEmployee} onClose={() => setCreateEmployee(false)} />}
     <div className="card">
            <DataTable value={data} showGridlines tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name"></Column>
                <Column field="email" header="E-Mail"></Column>
                <Column field="role" header="Role"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>
        </div>
    </AdminLayout>
  )
}

export default AdminDashboard