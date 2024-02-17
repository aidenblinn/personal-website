"use client";
import React from "react";
import { Provider } from "react-redux";
import Program from "./programs/program.tsx";
import Icon from "./icon.tsx";
import UtilityBar from "./utilityBar/utilityBar.tsx";
import { iconColumns } from "../config/icons.ts";
import { IconType } from "../../types.ts";
import store from "../app/store.ts";

export default function Desktop() {
  return (
    <Provider store={store}>
      <main className="flex flex-col h-screen">
        <div
          id="desktop"
          className="flex grow w-screen bg-bliss bg-center content-start p-2"
        >
          {iconColumns.map((iconArray: IconType[], index: number) => (
            <div
              key={`column#${index}`}
              className="w-fit h-fit grid grid-cols-1 gap-4"
            >
              {iconArray.map((icon: IconType) => {
                if (icon.type === "program") {
                  return (
                    <React.Fragment key={`${icon.name}-fragment`}>
                      <Icon key={`${icon.name}-icon`} icon={icon}></Icon>
                      <Program key={`${icon.name}-program`} program={icon} />
                    </React.Fragment>
                  );
                } else {
                  return <Icon key={`${icon.name}-icon`} icon={icon} />;
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
