import React from 'react'

function AdminProfilePage({ params }) {
  return (
    <div className="container py-5">
      Welcome {params.id}
    </div>
  )
}

export default AdminProfilePage
