import React from 'react';

const MainContent = () => {
  return (
     <div className="ml-64 mt-24"> {/* Left space for nav and side bar */}
       <div className="flex w-3/5 h-60 m-20 mx-15  bg-blue-50 border border-blue-200 rounded-md shadow-lg">
       <div className="flex-none w-48 relative">
            <img src="main-content.png" alt="main content" className="absolute inset-0 w-full h-full object-cover" />
        </div> 
        <div className="flex items-center justify-center p-14">
            <button className="h-10 px-6 font-semibold rounded-md bg-blue-700 text-white" type="submit">
                Create an event
            </button>
        </div>
       </div>
     </div>
  )
}

export default MainContent;