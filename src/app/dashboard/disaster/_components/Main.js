import Menu from "./Menu";
import Map from "./Map";

const Main = ({ eventOptionsState, menuOpen, offline, eventData }) => {
  const [eventOptions, setEventOptions] = eventOptionsState;
  return (
    <main style={{ position: "relative", overflow: "hidden" }}>
      <Menu updater={[eventOptions, setEventOptions]} isOpen={menuOpen} />
      <Map
        eventData={eventData}
        offline={offline}
        eventOptions={eventOptions}
      />
    </main>
  );
};

export default Main;
