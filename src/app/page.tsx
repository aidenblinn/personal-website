"use client";
import { Provider } from "react-redux";
import Program from "../features/programs/program.tsx";
import Icon from "../features/icon.tsx";
import UtilityBar from "../features/utilityBar/utilityBar.tsx";
import { iconColumns } from "../config/programs.ts";
import { IconType } from "../../types.ts";
import store from "./store.ts";

export default function Desktop() {
  return (
    <Provider store={store}>
      <main className="flex flex-col h-screen">
        <div className="flex grow w-screen bg-bliss bg-center content-start p-2">
          {iconColumns.map((iconArray: IconType[], index: number) => (
            <div
              className="w-fit h-fit grid grid-cols-1 gap-4"
              key={`column#${index}`}
            >
              {iconArray.map((icon: IconType) => {
                if (icon.type === "program") {
                  return (
                    <>
                      <Icon icon={icon} />
                      <Program key={`${icon.name}-program`} program={icon} />
                    </>
                  );
                } else {
                  return <Icon icon={icon} />;
                }
              })}
            </div>
          ))}
        </div>
        <UtilityBar />
      </main>
    </Provider>
  );
}
