import React from 'react'

function Notification({title,message}:any) {
  return (
    <div className="divBackground w-[50%] my-5 border border-[white] p-5 ">
        <h2 className="Mulish font-[600] text-[2rem]">{title}</h2>
        <p className="Mulish font-[200] text-[1rem]"> {message}</p>
    </div>
  )
}

export default Notification