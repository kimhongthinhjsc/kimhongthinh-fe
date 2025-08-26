import React from "react";
import EventHeader from "~/components/EventHeader/EventHeader";
import EventSearch from "~/components/EventSearch/EventSearch";
import EventComing from "~/components/EventComing/EventComing";
import EventFinish from "~/components/EventFinish/EventFinish";
import EventForm from "~/components/EventForm/EventForm";

export default function EventsPage({ events = [] }) {
  return (
    <>
      <EventHeader events={events} />
      <EventSearch />
      <EventComing events={events} />
      <EventFinish events={events} />
      <EventForm />
    </>
  );
}
