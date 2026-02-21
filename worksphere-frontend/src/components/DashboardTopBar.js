import React from 'react';
import Icon from './DashboardIcons';

const DashboardTopBar = ({ roleLabel, username }) => {
  return (
    <div className="dashboard-topbar">
      <div className="topbar-search">
        <Icon name="search" className="icon" />
        <input type="text" placeholder="Search people, reports, tasks" />
      </div>
      <div className="topbar-actions">
        {/* <button className="topbar-btn" type="button">
          <Icon name="bell" className="icon" />
          <span className="badge-dot"></span>
        </button> */}
        <div className="topbar-profile">
          <div className="profile-avatar">
            {username ? username.charAt(0).toUpperCase() : 'W'}
          </div>
          <div>
            <p className="profile-name">{username || 'WorkSphere User'}</p>
            <span className="profile-role">{roleLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopBar;
