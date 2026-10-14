const pdfParse = require("pdf-parse");
const {generateInterviewReport,generateResumePdf} = require('../services/ai.service');
const InterviewReportModel = require('../models/interviewReport.model')

/**
 * 
 * @description controller to generate interview report based on user profile data 
 * @
 */




async function generateInterviewReportController(req, res) {
  try {
    // Check karein ki file properly upload hui hai ya nahi
    if (!req.file) {
      return res.status(400).json({ error: "Resume PDF file is required" });
    }

    const { text: resumeText } = await pdfParse(req.file.buffer);
    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({
      resume: resumeText,
      selfDescription,
      jobDescription
    });

    const interviewReport = await InterviewReportModel.create({
      user: req.user.id,
      resume: resumeText,
      selfDescription,
      jobDescription,
      ...interviewReportByAi,
      title: interviewReportByAi.title || "Interview Report"
    });

    res.status(201).json({
      message: "Interview Report generated successfully",
      interviewReport
    });
  } catch (err) {
    console.error("Error generating interview report:", err);
    res.status(500).json({ error: "Failed to generate interview report" });
  }
}



/**
 * @description Controller to get interview Report BY id 
 * 
 */

async function getInterviewReportByIdController(req,res){

  const {interviewId} = req.params
  const interviewReport =  await InterviewReportModel.findOne({_id:interviewId,user:req.user.id})

  if(!interviewReport){
   return res.status(404).json({
      message:"interview Report not found."
   })
  }

  res.status(200).json({
   message:"interview Report fetched Successfully.",
   interviewReport
  })

}

/**
 * @description Controller to get all interview reports of logged in user 
 */

async function getAllInterviewReportsController(req,res){
  const interviewReports = await InterviewReportModel.find({
    user: req.user.id
    })
.sort({ createdAt: -1 })
.select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");
       res.status(200).json({
         message:"Interview reports fetched successfully.",
         interviewReports
       })
}


/**
 * @description generate resume pdf based in user selfDescription,job Description,resume
 */
async function generateResumePdfController(req,res){
   const { jobDescription, selfDescription } = req.body;
   
   if(!jobDescription || !selfDescription) {
        return res.status(400).json({
          message: "Job description and self description are required."
        });
    }



    const pdfBuffer = await generateResumePdf({jobDescription,selfDescription})

    res.set({
      "Content-Type":"application/pdf",
      "Content-Disposition": "inline; filename=ATS_Optimized_Resume.pdf"    })
     res.send(pdfBuffer) 
}

module.exports = {generateInterviewReportController,getInterviewReportByIdController,getAllInterviewReportsController,generateResumePdfController};