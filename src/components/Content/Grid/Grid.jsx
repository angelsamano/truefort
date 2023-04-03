import React, { useMemo, useState, useRef, useEffect } from 'react';
import * as XLSX from "xlsx/xlsx";

import { useCustomHook as useUserContext } from '@services/ContextProvider';
import { defaultGrid } from '@services/MockedAuthenticatedUser';
import useStorage, { clearStorage } from '@services/Storage';
import IconButton from '@components/IconButton';
import './Grid.css';

function Grid() {
  const checkAll = useRef();
  const tableElement = useRef();
  const enforceUnique = useRef();
  const [selected, setSelected] = useState([]);
  const [current, setCurrent] = useState(undefined);
  const sortById = (data) => data.sort((a, b) => (a.userId > b.userId) ? 1 : (a.userId < b.userId) ? -1 : 0);

  const User = useUserContext();
  const [grid, setGrid] = useStorage(User.app, defaultGrid);
  const [table, setTable] = useState(useMemo(() => sortById(grid), [grid]));

  const gridInMemory = useRef(grid);

  useEffect(() => {
    gridInMemory.current = sortById(grid);
    setTable(prev => prev = gridInMemory.current);
  }, [grid]);

  const checkboxHandler = (event) => {
    const target = event.currentTarget;
    const array = selected.includes(target.name) ? selected.filter(node => node !== target.name) : [...selected, target.name];

    setSelected(prevInputs => prevInputs = array);
    checkAll.current.indeterminate = (array.length !== 0 && array.length < table.length);
  };

  function exportToExcel(type, fn, dl) {
    const wb = XLSX.utils.table_to_book(tableElement.current, { sheet: "sheet1" });

    return dl ?
      XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
      XLSX.writeFile(wb, fn || ('ExportedFromWeb.' + (type || 'xlsx')));
 }

  const actionHandler = (event) => {
    const target = event.currentTarget;

    switch (target.name) {
      case "add":     setCurrent({ __new: true }); break;
      case "edit":    setCurrent({ ...table.find(node => node.userId === selected[0]) }); break;
      case "refresh": clearStorage(); window.location.reload(false); break;
      case "delete":  setGrid(previous => previous.filter(item => !selected.includes(item.userId)));
                      checkAll.current.indeterminate = false;
                      setSelected([]);
                      break;
      case "export":  exportToExcel('xlsx'); break;
      default: break;
    }
  };

  const searchHandler = (event) => {
    const value = (event.currentTarget.value).toLowerCase();
    const options = gridInMemory.current;

    const results = options.filter(entry => {
      const { userId, firstName, lastName, email } = entry;

      if (userId.lastIndexOf(value) !== -1 ||
        firstName.lastIndexOf(value) !== -1 ||
        lastName.lastIndexOf(value) !== -1 ||
        email.lastIndexOf(value) !== -1) {
          return entry;
        }

        return null;
    });

    setTable(prev => prev = results);
  };

  const mulipleCheckHandler = () => {
    if (!table.length) return; 
    setSelected(prev => prev = selected.length ? [] : table.map(node => node.userId));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!current.userId || !current.firstName || !current.lastName || !current.email) return;

    let updated = [...table, {...current, createdOn: (new Date()).toString() }];
    if (selected.length) {
      const $target = selected[0];

      updated = table.map(record => {
        if (record.userId === $target) return current;
        return record;
      });
    }

    checkAll.current.indeterminate = false;
    setGrid(previous => previous = updated);
    setCurrent(undefined);
    setSelected([]);
  };

  const handleUpdates = (event) => {
    const target = event.currentTarget;
    const updates = {...current};
    
    updates[target.id] = target.id === 'userId' ? (target.value).toLowerCase() : target.value;
    setCurrent($current => $current = updates);
  };

  const checkUniqueId = (event) => {
    const target = event.currentTarget;
    const id = (target.value).toLowerCase();

    enforceUnique.current?.classList.remove('Input--error');
    if ((!selected.length && table.filter(record => record.userId === id).length)
      || (selected[0] !== id && table.filter(record => record.userId === id).length)
      || id === '') {
      enforceUnique.current?.classList.add('Input--error');
      enforceUnique.current?.focus();
    }
  }

  return (
    <div className="Grid">
      <div className="Grid__container">
        <div className="Grid__container__header">
          <IconButton icon="add" className="Grid__action" onClick={actionHandler} tooltip="Add a new record" disabled={current} /><i />
          <IconButton icon="edit" className="Grid__action" onClick={actionHandler} tooltip="Edit selected record" disabled={selected.length !== 1 || current} /><i />
          <IconButton icon="delete" className="Grid__action" onClick={actionHandler} tooltip="Delete selected record(s)" disabled={selected.length === 0 || current} /><i />
          <IconButton icon="refresh" className="Grid__action" onClick={actionHandler} tooltip="Reset the application" disabled={current} /><i />
          <IconButton icon="export" className="Grid__action" onClick={actionHandler} tooltip="Export to Microsoft Excel" disabled={grid.length === 0 || current} /><i />
          <input className="Grid__search" type="text" placeholder="Search" onChange={searchHandler} disabled={current} />
        </div>

        <table ref={tableElement} className="min-w-full mt-2" data-testid="table">
          <thead>
              <tr className="text-sm leading-4 text-gray-500 capitalize tracking-wider">
                <th className="px-3 py-3 font-medium">
                  <input className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" type="checkbox" 
                  ref={checkAll}
                  checked={table.length && selected.length === table.length}
                  onChange={mulipleCheckHandler}
                  />
                </th>
                <th className="px-3 py-3 text-left font-medium">User ID ↓</th>
                <th className="px-3 py-3 text-left font-medium">First Name</th>
                <th className="px-3 py-3 text-left font-medium">Last Name</th>
                <th className="px-3 py-3 text-left font-medium">Email</th>
                <th className="px-3 py-3 text-left font-medium">Status</th>
                <th className="px-3 py-3 text-left font-medium">Created On</th>
              </tr>
            </thead>
  
            <tbody className="font-light text-xs">
              { 
                table && table.map((node, id) => {
                  return (
                    <tr key={`grid-entry${id}`}>
                      <td className="px-3 py-1 whitespace-no-wrap">
                        <input className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        type="checkbox" checked={selected.includes(node.userId)}
                        name={node.userId}
                        onChange={checkboxHandler}
                        />
                      </td>
                      <td className="px-3 py-1 whitespace-no-wrap">
                        <div className="text-sm leading-5">{ node.userId }</div>
                      </td>

                      <td className="px-3 py-1 whitespace-no-wrap">
                      <div className="text-sm leading-5">{ node.firstName }</div>
                      </td>

                      <td className="px-3 py-1 whitespace-no-wrap">
                      <div className="text-sm leading-5">{ node.lastName }</div>
                      </td>

                      <td className="px-3 py-1 whitespace-no-wrap">
                      <div className="text-sm leading-5">{ node.email }</div>
                      </td>

                      <td className="px-3 py-1 whitespace-no-wrap">
                      <div className="text-sm leading-5">{ node.status }</div>
                      </td>

                      <td className="px-3 py-1 whitespace-no-wrap">
                      <div className="text-sm leading-5">{ node.createdOn }</div>
                      </td>

                    </tr>
                  );
                })
              }
            </tbody>
          </table>
  

          { current && (
            <div className="Popup">
              <div className='pb-3'>{ current.__new ? 'Add a new record' : 'Edit selected record' }</div>
              <form onSubmit={ (event) => event.preventDefault() }>
                <label htmlFor="userId">User ID</label>
                <input ref={enforceUnique} id="userId" placeholder="Must be unique" type="text" value={current.userId} onChange={handleUpdates} onBlur={checkUniqueId} className="Grid__input" /><br/>

                <label htmlFor="firstName">First Name</label>
                <input id="firstName" placeholder="First Name" type="text" value={ current.firstName} onChange={handleUpdates} className="Grid__input" /><br/>

                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" placeholder="Last Name" type="text" value={ current.lastName} onChange={handleUpdates} className="Grid__input" /><br/>

                <label htmlFor="Email">Email</label>
                <input id="email" placeholder="Email" type="text" value={ current.email} onChange={handleUpdates} className="Grid__input" /><br/>

                <label htmlFor="Status">Status</label>
                <select id="status" value={current.status} onChange={handleUpdates} className="Grid__input">
                  <option value="REGISTERED">REGISTERED</option>
                  <option value="INITIATED">INITIATED</option>
                </select>
                <br/>

                <button className="btn-secondary" type="cancel" onClick={() => setCurrent($current => $current = undefined)}>Cancel</button>
                <button className="btn-primary" type="submit" onClick={onSubmit}>Save Changes</button>
              </form>
            </div>
          )}
      </div>
    </div>
  );
}

export default Grid;
