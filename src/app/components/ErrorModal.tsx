"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "./Icon";

interface ErrorModalProps {
  message: string;
}
export default function ErrorModal({ message }: ErrorModalProps) {
  const [hide, setHide] = useState(false);
  const router = useRouter();

  const close = () => {
   router.push("/");
   setHide(true);
  }
  return (
    <>
      {!hide && (
        <div>
          <div
            id="popup-modal"
            className=" bg-black bg-opacity-35 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                  onClick={close}>
                   <Icon id="close" className="w-3 h-3"/>

                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                 <Icon id="error" fill="none" className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"/>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    {message}
                  </h3>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    onClick={close}
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
