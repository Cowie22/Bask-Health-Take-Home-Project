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
        <tr className='text-left border-b border-[var(--neutral-4)] flex justify-between w-full'>
          <th className='w-full'>User</th>
          <th className='text-center w-full'>Amount</th>
          <th className='text-right w-full'>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr
            key={t.id}
            className='border-b border-[var(--neutral-4)] flex justify-between w-full'
          >
            <td className='w-full'>{t.user}</td>
            <td className='text-center w-full'>{t.amount}</td>
            <td className='text-right w-full'>{t.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default memo(RecentTransactions)
