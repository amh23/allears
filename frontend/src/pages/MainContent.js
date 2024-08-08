import React from 'react';

const MainContent = () => {
  return (
     <div className="md:ml-64 mt-24 sm:my-30"> {/* Left space for nav and side bar */}
       <div className="flex md:w-4/5 sm:w-1/3 h-60 lg:m-20 md:m-10 sm:mt-20  bg-blue-50 border border-blue-200 rounded-md shadow-lg">
       <div className="flex-none lg:w-96 md:w-40 sm:hidden md:block lg:block relative">
            <img src="main-content.png" alt="main content" className="absolute inset-0 w-full h-full object-cover" />
        </div> 
        <div className="flex flex-col md:w-3/5 sm:w-1/2 items-center justify-center lg:p-14 md:p-6">
            <button className="h-10 px-6 font-semibold rounded-md bg-blue-700 text-white hover:shadow-md hover:shadow-blue-300 focus:shadow-blue-300" type="submit">
                Create an event
            </button>
            <p className="p-6 text-slate-600 font-semibold">Organize an event and run Q&A section</p>
        </div>
       </div>
     </div>
  )
}

export default MainContent;