import React from 'react';
import TicketCard from '../TicketCard/TicketCard';
import './BoardColumn.css';

const BoardColumn = ({ title, tickets }) => {
  return (
    <div className="column-title ">
      <h2>{title}</h2>
      {tickets.map((ticket, index) => (
        <TicketCard key={index} ticket={ticket} />
      ))}
    </div>
  );
};

export default BoardColumn;
