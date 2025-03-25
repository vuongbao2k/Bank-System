/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';

function Logout() {
  const navigate = useNavigate();
  UserService.logout();
  useEffect(() => {
    navigate("/login");
  }, [])
  return (
    <></>
  )
}

export default Logout