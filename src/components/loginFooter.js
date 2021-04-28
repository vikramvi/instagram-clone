export default function LoginFooter() {

    return (
        <footer className="flex flex-col items-stretch relative">
            <div className="flex flex-col items-stretch justify-start">
                <div className="flex flex-col items-stretch content-evenly justify-start">
                    <div className="relative flex flex-row items-stretch justify-center flex-grow-0 flex-shrink-0">
                        <div className="flex flex-col justify-start mx-2 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                            <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">About</a>
                        </div>
                        <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                            <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Blog</a>
                        </div>
                        <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                            <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Jobs</a>
                        </div>
                        <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                            <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Help</a>
                        </div>
                        <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                            <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">API</a>
                        </div>
                        <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                            <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Privacy</a>
                        </div>
                        <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                            <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Terms</a>
                        </div>
                        <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                            <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Top Accounts</a>
                        </div>
                        <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                            <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Hashtags</a>
                        </div>
                        <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                            <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Locations</a>
                        </div>
                    </div>
                    {
                        document.URL.indexOf("login") !== -1 ?
                            <div className="relative flex flex-row items-stretch justify-center flex-grow-0 flex-shrink-0">
                                <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                                    <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Food & Drink</a>
                                </div>
                                <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                                    <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Home & Garden</a>
                                </div>
                                <div className="flex flex-col justify-start mx-2 mb-3 items-stretch content-evenly flex-grow-0 flex-shrink-0 text-xs">
                                    <a href="https://about.instagram.com/" rel="nofollow noopener noreferrer" target="_blank">Music</a>
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
            <div className="flex flex-row flex-auto relative justify-center my-1.5 items-stretch flex-grow-0 flex-shrink-0 my-3">
                <div className="flex flex-col text-xs items-stretch block relative flex-shrink-0 leading-3">
                    <span className="inline-block relative">
                        <div className=" flex flex-row leading-none">
                            <span className="">
                                English
                                </span>
                            <div className="ml-0.5">
                                <span className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 48 48" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <select aria-label="Switch Display Language"
                            className="inline-block absolute opacity-0 inset-0">
                            <option value="de">Deutsch</option>
                            <option value="en">English</option>
                            <option value="en-gb">English (UK)</option>
                        </select>
                    </span>
                </div>
                <div className="text-xs ml-4">
                    © 2021 Instagram from Facebook
                    </div>
            </div>
        </footer>
    )
}