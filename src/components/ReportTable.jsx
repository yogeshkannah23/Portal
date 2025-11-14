import React from "react";

export default function ReportTable({isOpen, isFilterApplied}){
    return (
        <>
        <div className={`absolute top-2 left-80 sm:left-[22rem] md:left-[24rem] lg:left-[28rem] h-full bg-white shadow-lg border-r z-[9999]
  w-64 sm:w-72 md:w-80 lg:w-96 transition-transform duration-300 ease-in-out
  ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

            {isFilterApplied && (
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Report Data</h2>
                    {/* Add your data table here */}
                    <div className="text-sm text-gray-600">
                        <p>Data table will be displayed here after applying filters.</p>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}