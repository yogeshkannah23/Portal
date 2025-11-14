import React from "react";

export default function ReportTable({ isOpen, isFilterApplied, reportData  }) {
    const getStatusBadgeStyle = (status) => {
        if (status === "Visitée") {
            return "bg-green-100 text-green-800";
        } else if (status === "À Visiter") {
            return "bg-red-100 text-red-800";
        }
        return "bg-gray-100 text-gray-800";
    };

    return (
        <>
            <div className={`absolute top-2 left-80 sm:left-[22rem] md:left-[24rem] lg:left-[28rem] max-h-[calc(100vh-1rem)] bg-white shadow-lg border-r z-[9999]
  w-full max-w-[calc(100vw-20rem)] transition-transform duration-300 ease-in-out overflow-hidden
  ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                {isFilterApplied && (
                    <div className="p-4 h-full max-h-[calc(100vh-1rem)] flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex-shrink-0">Report Data</h2>

                        {reportData && reportData.length > 0 ? (
                            <div className="overflow-auto flex-1 min-h-0">
                                <table className="min-w-full border-collapse border border-gray-200 text-sm">
                                    <thead className="bg-gray-50 sticky top-0 z-10">
                                        <tr>
                                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700 whitespace-nowrap">ID</th>
                                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700 whitespace-nowrap">Status</th>
                                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700 whitespace-nowrap">Section</th>
                                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700 whitespace-nowrap">Cadastral Parcel</th>
                                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700 whitespace-nowrap">Cadastral Parcel Address</th>
                                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700 whitespace-nowrap">Region</th>
                                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700 whitespace-nowrap">Municipality</th>
                                            <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700 whitespace-nowrap">SAID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportData.map((row, index) => (
                                            <tr key={row.id || index} className="hover:bg-gray-50">
                                                <td className="border border-gray-200 px-4 py-2 text-gray-600 whitespace-nowrap">{row.name}</td>
                                                <td className="border border-gray-200 px-4 py-2 whitespace-nowrap">
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeStyle(row.status)}`}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-gray-600 whitespace-nowrap">{row.section}</td>
                                                <td className="border border-gray-200 px-4 py-2 text-gray-600 whitespace-nowrap">{row.cadastral_parcel}</td>
                                                <td className="border border-gray-200 px-4 py-2 text-gray-600 whitespace-nowrap">{row.cadastral_parcel_address}</td>
                                                <td className="border border-gray-200 px-4 py-2 text-gray-600 whitespace-nowrap">{row.region}</td>
                                                <td className="border border-gray-200 px-4 py-2 text-gray-600 whitespace-nowrap">{row.municipality}</td>
                                                <td className="border border-gray-200 px-4 py-2 text-gray-600 whitespace-nowrap">{row.said}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-sm text-gray-600">
                                <p>No data available. Please apply filters to view results.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}