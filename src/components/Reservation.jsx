import { getBookedDatesByCabinId, getSettings } from "@/lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { auth } from "@/lib/auth";
import LoginMessage from "./LoginMessage";

async function Reservation({ cabin }) {
  const session = await auth();
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className={"grid grid-cols-2 border border-primary-800 min-h-[400px]"}>
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      {session ? (
        <ReservationForm cabin={cabin} session={session} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
