import React from "react";
import EventHeader from "~/components/EventHeader/EventHeader";
import EventSearch from "~/components/EventSearch/EventSearch";
import EventComing from "~/components/EventComing/EventComing";
import EventFinish from "~/components/EventFinish/EventFinish";
import EventForm from "~/components/EventForm/EventForm";
import { useEventPast, useEventUpcoming } from "~/hooks/usePublic";

export default function EventsPage() {
  const { data: eventPastData, isLoading: isLoadingPast } = useEventPast();
  const { data: eventUpcomingData, isLoading: isLoadingUpcoming } = useEventUpcoming();

  return (
    <>
      <EventHeader events={eventUpcomingData?.events} isLoading={isLoadingUpcoming} />
      <EventSearch />
      <EventComing events={eventUpcomingData?.events} isLoading={isLoadingUpcoming} />
      <EventFinish events={eventPastData?.events} isLoading={isLoadingPast} />
      <EventForm />
    </>
  );
}
