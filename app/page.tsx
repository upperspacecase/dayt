import { getDailyThree } from "./dates";
import LandingClient from "./landing-client";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const subscribed = params.subscribed === "1";
  const errored = typeof params.error !== "undefined";
  const dailyThree = getDailyThree();
  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <LandingClient
      dailyThree={dailyThree}
      subscribed={subscribed}
      errored={errored}
      todayLabel={todayLabel}
    />
  );
}
