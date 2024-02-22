"use client";
import React from "react";
import { Provider } from "react-redux";
import Program from "../features/programs/program.tsx";
import Icon from "../features/icon.tsx";
import UtilityBar from "../features/utilityBar/utilityBar.tsx";
import { iconColumns } from "../config/icons.ts";
import { IconType } from "../../types.ts";
import store from "./store.ts";

export default function Desktop() {
  return (
    <Provider store={store}>
      <main className="flex flex-col h-screen">
        <div
          id="desktop"
          className="flex grow w-screen bg-bliss bg-cover bg-center content-start p-2"
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
                      <Icon
                        key={`${icon.name}-icon`}
                        icon={icon}
                        isLink={false}
                      ></Icon>
                      <Program key={`${icon.name}-program`} program={icon} />
                    </React.Fragment>
                  );
                } else {
                  return (
                    <React.Fragment key={`${icon.name}-fragment`}>
                      <img
                        className="absolute top-0 right-0 h-2"
                        src="icons/Link.ico"
                        alt=""
                      />
                      <Icon
                        key={`${icon.name}-icon`}
                        icon={icon}
                        isLink={true}
                      ></Icon>
                    </React.Fragment>
                  );
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
