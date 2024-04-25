'use client'
import React from 'react'
import {useRouter} from "next/navigation";

function AdminDashboard() {
  const router = useRouter()

  const logout = async () => {
    try {
        await fetch('/api/users/auth/logout')
        //toast.success('Logout successful')
        router.push('/admin/login')
    } catch (err) {
      console.log(err.message);
      //toast.error(err.message)
    }
}
  return (
    <div>
      Dashboard
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default AdminDashboard
