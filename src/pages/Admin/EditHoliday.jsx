import React from 'react'
import Holiday from '../Holiday'
import { useGetHolidayByIdQuery } from '../../redux/features/holiday/holidayApi'
import { useParams } from 'react-router-dom'

const EditHoliday = () => {
    const {id}=useParams();
    const {data}=useGetHolidayByIdQuery(id)

  return (
    <Holiday isEdit={true} existingHoliday={data?.data} id={id}/>
  )
}

export default EditHoliday
