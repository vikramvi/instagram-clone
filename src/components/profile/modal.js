import { useEffect } from "react";

const Modal = ({ handleClick }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'unset';
    }, []);

    return (
        <div className="fixed w-4/5 h-4/5 bg-red-300">
            <section>
                <p>Modal</p>
                <p>Data</p>
                <button onClick={handleClick}>
                    Close
                </button>
            </section>
        </div>
    )
}

export default Modal;