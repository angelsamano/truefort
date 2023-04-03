import React from 'react';

import Grid from '@components/Content/Grid';
import Notes from '@components/Content/Notes';
import ErrorCatching from '@components/Content/ErrorCatching';
import './Content.css';

const Content = () => {
  return (
    <div className="flex w-full" data-testid="dashboard-content">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">.</div>
      <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between">
            <div className="">
              <div className="text-3xl font-bold">Hello there,</div>
              <div className="">I actually added a "dashboard view" and excel export is working too!</div>
            </div>
          </div>
        </div>

        <div className="Section lg:w-3/5">
          <div className="rounded-sm bg-card h-60">
            <ErrorCatching />
          </div>
        </div>
        <div className="Section lg:w-2/5">
          <div className="rounded-sm bg-card h-60">
            <Notes />
          </div>
        </div>

        <div className="Section lg:w-3/3">
          <div className="rounded-sm bg-card">
            <Grid />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
