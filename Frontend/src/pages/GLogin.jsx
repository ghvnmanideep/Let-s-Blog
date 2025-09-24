import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';


export default function GLogin() {
  const navigate = useNavigate();

  const handleLoginSuccess = async credentialResponse => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/google-login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tokenId: credentialResponse.credential }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Google login failed.');
        return;
      }
      localStorage.setItem('user', JSON.stringify({
        _id: data._id,
        username: data.username,
        role: data.role,
        token: data.token,
      }));
      localStorage.setItem('token', data.token);
      dispatch(setUser({ _id: data._id, username: data.username, role: data.role, token: data.token }));
      navigate('/dashboard');
    } catch {
      alert('Google login failed due to network or server error.');
    }
  };

  return <GoogleLogin onSuccess={handleLoginSuccess} onError={() => alert('Google login failed')} />;
}
