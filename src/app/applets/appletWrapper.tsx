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
        className="rounded-lg overflow-hidden"
        isOpen={modalIsOpen}
        disableKeystroke={true}
      >
        <div
          onClick={() => {
            setModal(false);
          }}
          className="flex justify-between items-center h-8 p-1 bg-blue-600"
        >
          <div className="flex-1 flex justify-start items-center h-6">
            <img className="h-6 mr-2" src={`icons/${title}.ico`} />
            <p className="text-white">{title}</p>
          </div>
          <div className="flex-1 h-6 text-right">
            <button
              className="bg-red-600 text-white h-6 w-6 border-[1px] border-white rounded"
              onClick={() => {
                setModal(false);
              }}
            >
              X
            </button>
          </div>
        </div>
        {applet()}
      </ReactModal>
    </>
  );
}
