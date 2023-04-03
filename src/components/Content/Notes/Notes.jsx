import React from 'react';
import './Notes.css';

function Notes() {
  return (
    <div className="p-4 h-full">
      <div className="flex justify-between items-center">
        <div className="font-bold">Some notes about this app:</div>
      </div>
      <ol className="Notes">
        <li>It simulates an authenticated user using React.createContext, currently using angelsamano@</li>
        <li>Also simulates a database using LocalStorage, all changes you make will persists until your session expires</li>
        <li>You can reset the application pressing the button in the grid (the one that looks like refresh icon)</li>
      </ol>
    </div>
  );
}

export default Notes;
