"use client"
import {AdminLayout} from '../layout/adminLayout'
import { Button } from '@/components/ui/button'
import {CreateEmployeeDialog} from "@/components/Dialogs/CreateEmployeeDialog"
import React from 'react'
function AdminDashboard() {
 const [createEmployee, setCreateEmployee] = React.useState(false)
  return (
    <AdminLayout>
     <div>
      <h1>Welcome, Munish</h1>
      <Button onClick={() => setCreateEmployee(true)}>Create Employee</Button>
     </div>
     <CreateEmployeeDialog visible={createEmployee} onClose={() => setCreateEmployee(false)} />
    </AdminLayout>
  )
}

export default AdminDashboard