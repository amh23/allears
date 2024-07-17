const EventCodePage = () => {
    return(
       <div className="w-full   bg-red-500 p-8">
         <div className="bg-blue-400">
            <p className="text-lg from-neutral-50 ">
                Joining as a participant?
            </p>
            <p className="text-xs from-neutral-50">
                No account needed.
            </p>
            <input 
                id="eventCode"
                name="eventCode"
                type="text"
                placeholder="Enter your event code"
                />

        </div>
       </div>
    );
}

export default EventCodePage;