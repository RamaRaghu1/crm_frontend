import React from 'react'
import Announcement from '../Announcement'
import { useParams } from 'react-router-dom'
import { useGetAnnouncementByIdQuery } from '../../redux/features/announcement/announcementApi';

const EditAnnouncement = () => {
    const {id}=useParams();
    const {data}=useGetAnnouncementByIdQuery(id)
    console.log("announ", data?.data);
  return (
   <Announcement isEdit={true} selectedAnnouncement={data?.data} id={id}/>
  )
}

export default EditAnnouncement
