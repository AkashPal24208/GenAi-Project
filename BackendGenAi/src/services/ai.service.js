const  { GoogleGenAI, TrafficType }  =  require("@google/genai");

const {z} = require("zod");
const {zodToJsonSchema} = require("zod-to-json-schema");
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
}) 

const InterviewReportSchema = z.object({

    matchScore: z
        .number()
        .min(0)
        .max(100)
        .describe(
            "Candidate's match score for the job from 0 to 100"
        ),

    technicalQuestions: z.array(
        z.object({
            question: z.string().describe(
                "A technical question that can be asked in the interview"
            ),

            intention: z.string().describe(
                "The interviewer's intention behind asking this question"
            ),

            answer: z.string().describe(
                "How the candidate should answer this question and what points to cover"
            )
        })
    ).describe(
        "Technical interview questions relevant to the candidate and job"
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string().describe(
                "A behavioral question that can be asked in the interview"
            ),

            intention: z.string().describe(
                "The interviewer's intention behind asking this question"
            ),

            answer: z.string().describe(
                "How the candidate should answer this question"
            )
        })
    ).describe(
        "Behavioral interview questions relevant to the candidate and job"
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string().describe(
                "A skill the candidate needs to improve"
            ),

            severity: z.enum([
                "low",
                "medium",
                "high"
            ]).describe(
                "Severity of this skill gap"
            )
        })
    ).describe(
        "Skills the candidate needs to improve for this job"
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number().describe(
                "Preparation day number"
            ),

            focus: z.string().describe(
                "Main focus of this preparation day"
            ),

            tasks: z.array(
                z.string()
            ).describe(
                "Tasks to complete on this day"
            )
        })
    ).describe(
        "A day-wise interview preparation plan"
    ),

    title: z.string().describe(
        "The job title for which the interview report is generated"
    )
});



async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    const prompt = `
You are an expert technical interviewer and career advisor.

Analyze the candidate's information.

RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

Generate an interview preparation report.

The report MUST contain:

1. matchScore
   - number between 0 and 100

2. title
   - appropriate job title based on the job description

3. technicalQuestions
   - generate at least 5 technical interview questions
   - each question must contain:
     question
     intention
     answer

4. behavioralQuestions
   - generate at least 5 behavioral interview questions
   - each question must contain:
     question
     intention
     answer

5. skillGaps
   - identify skills the candidate should improve
   - severity must be low, medium, or high

6. preparationPlan
   - create at least 3 preparation days
   - each day must contain:
     day
     focus
     tasks

Return ONLY the requested JSON structure.
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: prompt,

        config: {
            responseMimeType: "application/json",

            responseSchema: {
                type: "object",

                properties: {

                    matchScore: {
                        type: "number",
                        description: "Candidate match score from 0 to 100"
                    },

                    technicalQuestions: {
                        type: "array",
                        items: {
                            type: "object",

                            properties: {
                                question: {
                                    type: "string"
                                },
                                intention: {
                                    type: "string"
                                },
                                answer: {
                                    type: "string"
                                }
                            },

                            required: [
                                "question",
                                "intention",
                                "answer"
                            ]
                        }
                    },

                    behavioralQuestions: {
                        type: "array",
                        items: {
                            type: "object",

                            properties: {
                                question: {
                                    type: "string"
                                },
                                intention: {
                                    type: "string"
                                },
                                answer: {
                                    type: "string"
                                }
                            },

                            required: [
                                "question",
                                "intention",
                                "answer"
                            ]
                        }
                    },

                    skillGaps: {
                        type: "array",

                        items: {
                            type: "object",

                            properties: {
                                skill: {
                                    type: "string"
                                },

                                severity: {
                                    type: "string",
                                    enum: [
                                        "low",
                                        "medium",
                                        "high"
                                    ]
                                }
                            },

                            required: [
                                "skill",
                                "severity"
                            ]
                        }
                    },

                    preparationPlan: {
                        type: "array",

                        items: {
                            type: "object",

                            properties: {
                                day: {
                                    type: "number"
                                },

                                focus: {
                                    type: "string"
                                },

                                tasks: {
                                    type: "array",
                                    items: {
                                        type: "string"
                                    }
                                }
                            },

                            required: [
                                "day",
                                "focus",
                                "tasks"
                            ]
                        }
                    },

                    title: {
                        type: "string"
                    }
                },

                required: [
                    "matchScore",
                    "technicalQuestions",
                    "behavioralQuestions",
                    "skillGaps",
                    "preparationPlan",
                    "title"
                ]
            }
        }
    });

    console.log("GEMINI RESPONSE:");
    console.log(response.text);

    return JSON.parse(response.text);
}



 /**
  * @description generating pdf from html 
  */

  async function generatePdfFromHtml(htmlContent){
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent,{waitUntil:"networkidle0"})
   
     const pdfBuffer = await page.pdf({
           format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
     })
  
    await browser.close()

    return pdfBuffer

  }

  /**
   * @description generate resume pdf
   */

  async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `


    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })

    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = {generateInterviewReport,generateResumePdf }