import SiteClient from "./site-client";
import SiteRealtimeSync from "./site-realtime-sync";

export default function Home() {
  return (
    <>
      <SiteRealtimeSync />
      <SiteClient />
    </>
  );
}
