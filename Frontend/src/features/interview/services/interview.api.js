import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

/** 
 * @description service to genearte report based on user self description ,resume and jobDescription 
 * */ 

export const generateInterviewReport = async ({jobDescription,selfDescription,resumeFile})=>{
    const formData = new FormData()
    formData.append("jobDescription",jobDescription)
    formData.append("selfDescription",selfDescription)
    formData.append("resume",resumeFile)

    const response = await api.post("/api/interview/gen-report", formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    return response.data
}

/** 
 * @description service to get interview report by id  
 * */ 

export const getInterviewReportById = async (interviewId)=>{
    const response = await api.get(`/api/interview/past-report/${interviewId}`)

    return response.data
}

/** 
 * @description service to get specific report about user
 * */ 

export const getAllInterviewReports = async ()=>{
    const response = await api.get("/api/interview/past-report")

    return response.data
}

/**
 * @description service to generate resume pdf on user self Description ,resume,content and job Description
 */

export const generateResumePdf = async ({interviewReportId})=>{
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`,null,{
        responseType:"blob" 
    })
    return response.data
}
   