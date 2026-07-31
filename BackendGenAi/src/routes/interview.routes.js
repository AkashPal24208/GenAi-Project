const express = require("express");
const authMiddleware = require("../middleware/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const interviewRouter = express.Router();

// getting upload middleare 
const upload = require('../middleware/file.middleware');

/**
 * @route POST/api/interview
 * @description  generate new interview report on the basis of user 
 * self description resume pdf and job description 
 * @access  private 
 */

  interviewRouter.post("/gen-report",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController);  // it forward user only when logged in user steps in .

/**
 * @route GET/api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
 
   interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)

/**
 * @route GET/api/interview/
 * @description get specific logged in user report 
 * @access private 
 */

   interviewRouter.get("/gen-report",authMiddleware.authUser,interviewController.getAllInterviewReportsController)

/**
 * @route  GET/api/interview/resume/pdf
 * @description generate resume pdf on the basis of user selfDEscription ,jobDescription ,resume
 * @access private
 */

interviewRouter.post("/resume/pdf/:interviewReportId",authMiddleware.authUser,interviewController.generateResumePdfController)

module.exports = interviewRouter;