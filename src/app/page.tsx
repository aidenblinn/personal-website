"use client";
import { Provider } from "react-redux";
import Program from "../features/programs/program.tsx";
import UtilityBar from "../features/utilityBar/utilityBar.tsx";
import { programColumns } from "../config/programs.ts";
import { ProgramType } from "../../types.ts";
import store from "./store.ts";

export default function Desktop() {
  return (
    <Provider store={store}>
      <main className="flex flex-col h-screen">
        <div className="flex grow w-screen bg-bliss bg-center content-start p-2">
          {programColumns.map((programArray: ProgramType[], index: number) => (
            <div
              className="w-fit h-fit grid grid-cols-1 gap-4"
              key={`column#${index}`}
            >
              {programArray.map((program: ProgramType) => (
                <Program key={`${program.name}-program`} program={program} />
              ))}
            </div>
          ))}
        </div>
        <UtilityBar />
      </main>
    </Provider>
  );
}
