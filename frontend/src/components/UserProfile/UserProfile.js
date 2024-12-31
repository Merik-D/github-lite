import React from 'react';
import './UserProfile.css';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <img
        src={user.avatar_url || 'https://via.placeholder.com/150'}
        alt={`${user.name || user.login}'s avatar`}
        className="user-avatar"
      />
      <h2 className="user-name">{user.name || user.login}</h2>
      <p className="user-bio">{user.bio || 'No bio available.'}</p>
      <p><strong>Location:</strong> {user.location || 'Not provided'}</p>
      <p><strong>Email:</strong> {user.email || 'N/A'}</p>
      <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="user-profile-link">
        Visit Profile
      </a>
    </div>
  );
};

export default UserProfile;