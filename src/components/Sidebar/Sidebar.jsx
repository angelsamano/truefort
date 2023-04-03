import React from 'react';
import { ReactComponent as Icon } from '@images/dashboard.svg';
import IconButton from '@components/IconButton';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="Dashboard__sidebar sm:w-20 xl:w-60 sm:flex" data-testid="dashboard-sidebar">
      <div className="Dashboard__sidebar__header">
        <div className="sm:justify-center xl:justify-start p-2">
          <IconButton icon="logo" />
          <div className="block text-sm sm:hidden xl:block ml-2">React Code Challenge — Grid component</div>
        </div>
      </div>

      <div className="Dashboard__sidebar__menu">
        <div className='sm:justify-center sm:px-0 sm:mt-6 xl:px-3 xl:justify-start xl:mt-3'>
          <Icon />
          <div className="block ml-2 sm:hidden xl:block">Main dashboard</div>
          <div className="block flex-grow sm:hidden xl:block" />
        </div>
        <div className="flex-grow" />
      </div>
    </div>
  );
};

export default Sidebar;
