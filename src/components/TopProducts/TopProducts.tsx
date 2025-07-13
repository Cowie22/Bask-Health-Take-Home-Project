'use client'

import React, { memo } from 'react'

interface Product {
  id: string
  name: string
  sales: number
}

const TopProducts = ({ products }: { products: Product[] }) => {
  return (
    <ul className='space-y-1'>
      {products.map((p) => (
        <li
          key={p.id}
          className='flex justify-between'
        >
          <span>{p.name}</span>
          <span>{p.sales}</span>
        </li>
      ))}
    </ul>
  )
}

export default memo(TopProducts)
