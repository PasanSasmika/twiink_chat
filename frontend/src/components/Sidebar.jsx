import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeleton/SidebarSkeleton';
import { useAuthStore } from '../store/useAuthStore';

function Sidebar() {
 
    const {getUsers, users, selectedUser,setSelectedUser,isUserLoading} = useChatStore()

    const {onlineUsers} = useAuthStore()

    useEffect(()=>{
        getUsers()
    },[getUsers])

    if(isUserLoading) return <SidebarSkeleton/>
    
  return (
    <div>Sidebar</div>
  )
}

export default Sidebar