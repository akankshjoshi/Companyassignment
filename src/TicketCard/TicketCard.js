import React from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket }) => {
  return (
      <div className="ticket-card">
      <h3>{ticket.title}</h3>
      <p>{`Tag: ${ticket.tag || 'No Priority'}`}</p>
      <p>{`Priority: ${ticket.priority || 'No Priority'}`}</p>
      <p>{`Status: ${ticket.status || 'No Status'}`}</p>
      <p>{`Assigned To: ${ticket.userId || 'Unassigned'}`}</p>
    </div>
  );
};

export default TicketCard;
