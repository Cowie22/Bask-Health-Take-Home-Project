'use client'

import React, { memo } from 'react'

interface Transaction {
  id: number
  user: string
  amount: string
  date: string
}

const RecentTransactions = ({
  transactions,
}: {
  transactions: Transaction[]
}) => {
  return (
    <table className='w-full text-sm'>
      <thead>
        <tr className='text-left border-b border-neutral-300'>
          <th>User</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr
            key={t.id}
            className='border-b border-neutral-200'
          >
            <td>{t.user}</td>
            <td>{t.amount}</td>
            <td>{t.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default memo(RecentTransactions)
