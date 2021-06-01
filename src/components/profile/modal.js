import { useEffect, useRef } from "react";


export const Modal = ({ showModal, setShowModal }) => {

    return (
        <>
            { showModal ? (
                <div className="fixed inset-0 flex bg-gray-300 bg-opacity-30 z-50"> {/* Wrapper */}
                    <div className="relative p-8 bg-white w-full max-w-md flex m-auto flex-col"> {/* dialog box */}
                        <h2 className="text-4xl text-center font-hairline md:leading-loose text-grey md:mt-8 mb-4">Question!</h2>
                        <p className="text-xl leading-normal mb-8 text-center">
                            Are you enjoying Tailwind CSS?
                        </p>
                        <div className="inline-flex justify-center">
                            <button className="bg-grey-lighter flex-1 border-b-2 md:flex-none border-green ml-2 hover:bg-green-lightest text-grey-darkest font-bold py-4 px-6 rounded">
                                Absolutely
                        </button>
                            <button className="bg-grey-lighter flex-1 md:flex-none border-b-2 border-red ml-2 hover:bg-red-lightest text-grey-darkest font-bold py-4 px-6 rounded">
                                Not so much
                        </button>
                        </div>
                        <span className="absolute pt-2 px-2 top-0 right-0" onClick={() => { setShowModal(prev => !prev) }}>
                            <svg className="h-12 w-12 fill-current text-grey hover:text-grey-darkest" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                        </span>
                    </div>
                </div>
            ) : null}
        </>
    )

}