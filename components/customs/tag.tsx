import React from 'react'

const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='px-2.5 py-1 bg-primary/10 text-primary  text-sm font-bold rounded w-fit '>{children}</div>
  )
}

export default Tag