import AdminPanel from '@/components/admin/AdminPanel'
import getFurnitureAdmin from '@/libs/admin/getFurnitureAdmin'
import React from 'react'

export default async function AdminPage() {
  const furnitures = await getFurnitureAdmin()
  return (
    <div>
      <AdminPanel furnitures={furnitures} />
    </div>
  )
}
