import Program from "./programs/program.tsx";
import Icon from "./programs/icon.tsx";
import UtilityBar from "./utilityBar/utilityBar.tsx";
import { iconColumns } from "../../config/icons.ts";
import { IconType } from "../../../types.ts";
import React from "react";

export default function Desktop(): React.ReactElement {
  return (
    <main className="flex flex-col h-screen">
      <div
        id="desktop"
        className="flex grow w-screen bg-bliss bg-cover bg-center content-start p-2"
      >
        {iconColumns.map((iconColumn: IconType[], index: number) => (
          <div
            key={`column#${index}`}
            className="w-fit h-fit grid grid-cols-1 gap-4"
          >
            {iconColumn.map((icon: IconType) => {
              if (icon.type === "program" || icon.type === "inprogress") {
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
                      src="img/programIcons/Link.ico"
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
  );
}
