"use client";
import AppletWrapper from "./applets/appletWrapper.tsx";
import Email from "./applets/email.tsx";
import Clock from "./applets/clock.tsx";

export default function Home() {
  type iconArray = [() => JSX.Element, string];
  const iconColumns: iconArray[][] = [
    [
      [Email, "Email"],
      [Email, "Clock"],
      [Email, "Trash"],
      [Email, "Email"],
    ],
    [
      [Email, "Email"],
      [Email, "Clock"],
      [Email, "Trash"],
    ],
  ];

  return (
    <main className="flex flex-col h-screen">
      <div className="flex grow w-screen bg-bliss bg-center content-start p-2">
        {iconColumns.map((appletArray, index) => (
          <div
            className="w-fit h-fit grid grid-cols-1 gap-4"
            key={`icon#${index}`}
          >
            {appletArray.map(([modal, title], index) =>
              AppletWrapper(modal, title, index)
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center w-screen h-12 bg-bliss-blue">
        {/* start */}
        <div className="w-fit"></div>
        {/* open apps */}
        <div className="flex-1"></div>
        {/* Clock */}
        <div className="w-fit pr-2">
          <Clock />
        </div>
      </div>
    </main>
  );
}
