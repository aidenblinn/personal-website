"use client";
import AppletWrapper from "./applets/appletWrapper.tsx";
import Email from "./applets/email.tsx";

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
      <div className="w-screen h-12 bg-bliss-blue"></div>
    </main>
  );
}
