import { createContext,useState } from "react";
import { getAllInterviewReports,getInterviewReportById } from "./services/interview.api";



export const InterviewContext = createContext(null)

export const InterviewProvider = ({children})=>{
    const [loading,setLoading] = useState(false)
    const [report,setReport] = useState(null)
    const [reports,setReports] = useState([])
    
     const getReports = async ()=>{
        try{
            setLoading(true);
            const data = await getAllInterviewReports();
            setReports(data);
        }
        catch(error){
            console.log("error while fetching report",error);
        }
        finally{
            setLoading(false);
        }
     } ;

     const getReportsById = async ()=>{
        try{
            setLoading(true);
            const data = await getInterviewReportById();
            setReport(data); // specific report 
        }
        catch(error){
            console.log("error while fetching particular report",error);
        }
        finally{
            setLoading(false);
        }
     };
     
    return (
        <InterviewContext.Provider 
            value={{
        loading,
        setLoading, 
        report,   
        setReport,
        reports,
        setReports,
      }}
            >
                {children}
        </InterviewContext.Provider>
    )
}
