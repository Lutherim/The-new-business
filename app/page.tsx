import React from 'react';
import GuestManorClientPage from '@/components/GuestManorClientPage';

function formatIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function HomePage() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  const twoDaysOut = new Date(now);
  twoDaysOut.setDate(now.getDate() + 3);

  const nextWeekEvent = new Date(now);
  nextWeekEvent.setDate(now.getDate() + 7);

  return (
    <GuestManorClientPage
      defaultCheckIn={formatIsoDate(tomorrow)}
      defaultCheckOut={formatIsoDate(twoDaysOut)}
      defaultEventDate={formatIsoDate(nextWeekEvent)}
    />
  );
}
