import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { useInterview } from '../../interview/hooks/useInterview'
import "../css/PastReport.css"
import { useNavigate } from 'react-router';
const PastReport = () => {
    const {reports,getReports,loading} = useInterview();
   const navigate = useNavigate();
    useEffect(()=>{
           console.log("Fetching reports...");
            console.log("Reports:", reports);
        getReports();
    },[]);

  return (
    <div className='report-card'>
       
            <h1>All Reports</h1>

            {loading && <p>Loading...</p>}
      {/* report card for each box  */}
            {reports.map((report) => (
                <div className='report' key={report._id} onClick={()=>navigate(`/interview/${report._id}`)}>
                    <h3>{report.title}</h3>
                    <p>Match Score: {report.matchScore}%</p>
                    <p>
                        {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                   
                </div>
            ))}
        </div>
  )
}

export default PastReport
