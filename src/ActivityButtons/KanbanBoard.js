import React, { useState, useEffect } from 'react';
import BoardColumn from '../BoardColumn/BoardColumn';
import axios from 'axios';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [viewState, setViewState] = useState({
    grouping: 'status',
    sorting: 'priority',
  });

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => response.json())
      .then((data) => {
        console.log('https://api.quicksell.co/v1/internal/frontend-assignment', data);
        setTickets(data.tickets);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  
  const groupAndSortTickets = () => {
    const groupedTickets = tickets.reduce((acc, ticket) => {
      const groupKey = ticket[viewState.grouping] || 'Unassigned';
      acc[groupKey] = [...(acc[groupKey] || []), ticket];
      return acc;
    }, {});

    Object.keys(groupedTickets).forEach((group) => {
      groupedTickets[group] = groupedTickets[group].sort((a, b) => {
        if (viewState.sorting === 'priority') {
          return b.priority - a.priority;
        } else if (viewState.sorting === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    });

    return groupedTickets;
  };

  const groupedAndSortedTickets = groupAndSortTickets();

  return (
    <div className="kanban-board">
          <div className="buttons-container">
          <button onClick={() => setViewState({ ...viewState, grouping: 'status' })}>Group by Status</button>
          <button onClick={() => setViewState({ ...viewState, grouping: 'userId' })}>Group by User</button>
          <button onClick={() => setViewState({ ...viewState, grouping: 'priority' })}>Group by Priority</button>
          <button onClick={() => setViewState({ ...viewState, sorting: 'priority' })}>Sort by Priority</button>
          <button onClick={() => setViewState({ ...viewState, sorting: 'title' })}>Sort by Title</button>
          </div>
          <div className="boxes">
          {Object.keys(groupedAndSortedTickets).map((group, index) => (
        
          <BoardColumn key={index} title={group} tickets={groupedAndSortedTickets[group]} />
      
        ))}
        </div>

    </div>
  );
};

export default KanbanBoard;
