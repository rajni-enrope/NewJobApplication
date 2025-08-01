import React, { useEffect, useState } from "react";

const AcceptApplication = ()=>{
  const [acceptedData, setAcceptedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [workExpFilter, setWorkExpFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  

   // Unique values for dropdowns
  const uniqueWorkExps = [...new Set(acceptedData.map(app => app.workExp))];
  const uniqueLocations = [...new Set(acceptedData.map(app => app.location))];
  const uniqueSources = [...new Set(acceptedData.map(app => app.source))];

    

     useEffect(() => {
    const data = JSON.parse(localStorage.getItem("acceptedApplications")) || [];
    setAcceptedData(data);
     setFilteredData(data);
  }, []);

   useEffect(() => {
  let filtered = [...acceptedData];

  if (workExpFilter) {
    filtered = filtered.filter((app) => app.workExp === workExpFilter);
  }
  if (locationFilter) {
    filtered = filtered.filter((app) => app.location === locationFilter);
  }
  if (sourceFilter) {
    filtered = filtered.filter((app) => app.source === sourceFilter);
  }
  if (selectedDateRange) {
    filtered = filterByDateRange(filtered);
  }

  setFilteredData(filtered);
}, [workExpFilter, locationFilter, sourceFilter, selectedDateRange, acceptedData]);


      // crete a date filter function 
      const filterByDateRange = (data) => {
      const now = new Date(); // current date
     return data.filter((item) => {
     const appliedDate = new Date(item.appliedDate); // parse each item's applied date
     switch (selectedDateRange) {
      case "last7days":
        // Difference between today and appliedDate in days
        return (now - appliedDate) / (1000 * 60 * 60 * 24) <= 7;
       case "thisMonth":
        return (
          appliedDate.getMonth() === now.getMonth() &&
          appliedDate.getFullYear() === now.getFullYear()
        );

      case "janToMar":
        return (
          appliedDate.getMonth() >= 0 &&  // Jan = 0
          appliedDate.getMonth() <= 2 &&  // Mar = 2
          appliedDate.getFullYear() === 2025
        );

      case "aprToJun":
        return (
          appliedDate.getMonth() >= 3 &&  // Apr = 3
          appliedDate.getMonth() <= 5 &&  // Jun = 5
          appliedDate.getFullYear() === 2025
        );
     default:
        return true; // If no filter is selected, return all data
    }
  });
};




const handleReject = (application) => {
  const rejected =
    JSON.parse(localStorage.getItem("rejectedApplications")) || [];

  const applicationWithDate = {
    ...application,
    rejectedDate: new Date().toISOString().split("T")[0],
  };

  const updatedRejected = [...rejected, applicationWithDate];
  localStorage.setItem("rejectedApplications", JSON.stringify(updatedRejected));

  // Remove from accepted list
  const updatedAccepted = acceptedData.filter((item) => item.id !== application.id);
  setAcceptedData(updatedAccepted);
  localStorage.setItem("acceptedApplications", JSON.stringify(updatedAccepted));
};


    const handleInterviewed = (application) => {
  const interviewed =
    JSON.parse(localStorage.getItem("interviewedApplications")) || [];

  const applicationWithDate = {
    ...application,
    interviewedDate: new Date().toISOString().split("T")[0],
  };

  const updatedInterviewed = [...interviewed, applicationWithDate];
  localStorage.setItem("interviewedApplications", JSON.stringify(updatedInterviewed));

  // Remove from accepted list
  const updatedAccepted = acceptedData.filter((item) => item.id !== application.id);
  setAcceptedData(updatedAccepted);
  localStorage.setItem("acceptedApplications", JSON.stringify(updatedAccepted));
};

    return(
    <div className="p-4">
     <div className="flex justify-between items-center mb-4">
         <h2 className="text-xl font-bold mb-4">Accepted Applications</h2>
           {/* Filter dropdowns */}
      <div className="flex gap-3 flex-wrap">
         <select value={workExpFilter} onChange={(e) => setWorkExpFilter(e.target.value)} className="px-4 py-1 border border-gray-400 rounded text-sm">
         <option value="">Work Experience</option>
         {uniqueWorkExps.map((exp) => (
         <option key={exp} value={exp}>{exp} Year</option>  ))}  
         </select>

          <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="px-4 py-1 border border-gray-400 rounded text-sm">
          <option value="">Locations</option>
          {uniqueLocations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className="px-4 py-1 border border-gray-400 rounded text-sm">
          <option value=""> Sources</option>
          {uniqueSources.map((src) => (
            <option key={src} value={src}>{src}</option>
          ))}
        </select>

       <select onChange={(e) => setSelectedDateRange(e.target.value)} className="border p-1 rounded">
       <option value="">Date</option>
       <option value="last7days">Last 7 Days</option>
       <option value="thisMonth">This Month</option>
       <option value="janToMar">Jan - Mar 2025</option>
       <option value="aprToJun">Apr - Jun 2025</option>
       </select>
      </div>
     </div>
    
      
      {filteredData.length === 0 ? (
        <p className="text-gray-500">No accepted applications found.</p>
      ) : (
        <table className="min-w-full  text-sm border border-gray-300 ">
          <thead className="bg-gray-100  text-gray-700 text-left">
            <tr>
              <th className="p-2 border  border-gray-300 font-semibold">ID</th>
              <th className="p-2 border  border-gray-300 font-semibold">Job Title</th>
              <th className="p-2 border  border-gray-300 font-semibold">Domin</th>
              <th className="p-2 border  border-gray-300 font-semibold">Name</th>
              <th className="p-2 border  border-gray-300 font-semibold">Contact</th>
              <th className="p-2 border  border-gray-300 font-semibold">Email</th>
              <th className="p-2 border  border-gray-300 font-semibold">Work Exp</th>
              <th className="p-2 border  border-gray-300 font-semibold">Location</th>
              <th className="p-2 border  border-gray-300 font-semibold">Source</th>
              <th className="p-2 border  border-gray-300 font-semibold">Applied Date</th>
               <th className="p-2 border  border-gray-300 font-semibold">Accepted Date</th>
              <th className="p-2 border  border-gray-300 font-semibold">Resume</th>
               <th className="p-2 border   border-gray-300 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((app) => (
              <tr key={app.id}>
                <td className="p-2 border  border-gray-300 ">{app.id}</td>
                <td className="p-2 border  border-gray-300 ">{app.jobTitle}</td>
                <td className="p-2 border  border-gray-300 ">{app.domain}</td>
                <td className="p-2 border  border-gray-300 ">{app.name}</td>
                <td className="p-2 border  border-gray-300 ">{app.contact}</td>
                <td className="p-2 border  border-gray-300 ">{app.email}</td>
                <td className="p-2 border  border-gray-300 ">{app.workExp}</td>
                <td className="p-2 border  border-gray-300 ">{app.location}</td>
                <td className="p-2 border  border-gray-300 ">{app.source}</td>
                <td className="p-2 border  border-gray-300 ">{app.appliedDate}</td>
                <td className="p-2 border border-gray-300">{app.acceptedDate ? new Date(app.acceptedDate).toLocaleDateString() : "-"}</td>
                 <td className="p-2 border  border-gray-300 text-center space-x-2">
                  <button title="View Resume">👁️</button>
                  <button title="Download Resume">⬇️</button>
                </td>
                 <td className="p-2 border  border-gray-300">
                  <div className="flex gap-2">
                    <button     onClick={() => handleInterviewed(app)} className="border border-blue-500 text-blue-500 px-2 py-2 text-xs rounded  hover:bg-blue-100">
                       Interviewed
                    </button>
                    <button  onClick={() => handleReject(app)} className="border border-red-500 text-red-500 px-2 py-2 text-xs rounded hover:bg-red-100" >
                     Reject
                     </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    )
};
export default AcceptApplication;