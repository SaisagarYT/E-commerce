import React from 'react'

const UserReviews = (props) => {
  const items = [];
    for (let i = 0; i <Number(props.rating); i++){
      items.push(i);
    }
  return (
    <div className=' rounded-2xl max-md:w-full max-md:pl-10 max-md:pr-10 flex flex-col gap-1 p-2 w-80' data-aos="fade-up"
     data-aos-duration="1500">
            <div className="rating">
              {
                items.map((star,index) => <i key={index} className="fa-solid fa-star text-[12px] text-yellow-500"></i>)
              }
            </div>
            <p className='font-medium text-[18px]'>{props.name}</p>
            <p className='font-normal text-[14px]'>{props.description}</p>
          </div>
  )
}

export default UserReviews
