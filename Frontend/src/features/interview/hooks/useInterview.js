import { InterviewContext } from "../interview.context"
import {getAllInterviewReports,getInterviewReportById,generateInterviewReport,generateResumePdf} from "../services/interview.api"
import { useContext } from "react"
import { useParams } from "react-router"
import { useEffect } from "react"

/**
 * 
 * @returns custom hooks 
 */

export const useInterview = ()=>{
    const context = useContext(InterviewContext)

    if(!context){ 
        throw new Error("useInterview must be within an InterviewProvider")
    }

    const {loading,setLoading,report,setReport,reports,setReports} = context

    const generateReport = async ({jobDescription,selfDescription,resumeFile})=>{
        setLoading(true)
        
        try{
           const  response = await generateInterviewReport({jobDescription,selfDescription,resumeFile})
            // agar response and interviewReort na aye 
            if(!response || !response.interviewReport){
                throw new Error("Interview report data is missing from response");
            }

            setReport(response.interviewReport)
            // if success then return 
            return response.interviewReport;

        }
        catch(err){
            console.log("error while generating report")
            throw err;
        }
        finally{
            setLoading(false)
        }
    }

    /**
     * @description getting report by id 
     */

    const getReportById = async (interviewId)=>{
        setLoading(true)
      
        try{
            const response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
             console.log("API RESPONSE:", response)
            console.log("INTERVIEW REPORT:", response.interviewReport)
            return response.interviewReport
        }
        catch(error){
            console.log("error while getting report by id ")
            return null
        }
        finally{
            setLoading(false)
        }
    }

    /**
     * @description get Reports 
     */

    const getReports = async ()=>{
        setLoading(true)
        let response = null  
        try{
        const response = await getAllInterviewReports();
        setReports(response.interviewReports);
        console.log("Response:", response);
        return response.interviewReports;
        }
        catch(error){
            console.log(error)
            throw err;
        }
        finally{
            setLoading(false)
        }
       
    }
    
    // useEffect(()=>{
    //     if(interviewId){
    //         getReportById(interviewId)
    //     }else{
    //         getReports()
    //     }
    // },[interviewId])

/**
 * @description generation of resume pdf 
 */

const getResumePdf = async (interviewReportId) => {
    setLoading(true)

    let response = null

    try {
        response = await generateResumePdf({ interviewReportId })

        const url = window.URL.createObjectURL(
            new Blob([response], {
                type: "application/pdf"
            })
        )

        const link = document.createElement("a")

        link.href = url
        link.setAttribute(
            "download",
            `resume_${interviewReportId}.pdf`
        )

        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
}


return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf
}
}