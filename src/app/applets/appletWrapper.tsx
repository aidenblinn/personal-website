import { useState } from "react";
import ReactModal from "react-modal-resizable-draggable";

export default function AppletWrapper(
  applet: () => JSX.Element,
  title: string,
  index: number
): JSX.Element {
  const [modalIsOpen, setModal] = useState(false);

  return (
    <>
      <div
        className="w-16 h-16 m-2"
        key={`modal#${index}`}
        onClick={() => {
          setModal(true);
        }}
      >
        <img className="mx-auto h-12" src={`icons/${title}.ico`} />
        <p className="w-fit mx-auto">{title}</p>
      </div>
      <ReactModal
        className="rounded"
        isOpen={modalIsOpen}
        disableKeystroke={true}
      >
        <div>
          <div
            onClick={() => {
              setModal(false);
            }}
            className="flex justify-between bg-slate-200"
          >
            <div className="flex-1"></div>
            <div className="w-fit">
              <p>{title}</p>
            </div>
            <div className="flex-1 text-right">
              <button
                className="bg-blue-500 z-50 pointer-events-none"
                onClick={() => {
                  setModal(false);
                }}
              >
                X
              </button>
            </div>
          </div>
          {applet()}
        </div>
      </ReactModal>
    </>
  );
}
