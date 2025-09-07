const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const extractInfoFromGemini = async (resumeText) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
You are a resume analyzer bot. Given a resume text, extract and return the following structured JSON. Respond with ONLY the JSON object, and do not include any explanation, markdown, or text outside the JSON:

For the "feedback" section:
- "rating": Give a score from 1 (poor) to 10 (excellent) based on the overall quality, relevance, and completeness of the resume.
- "improvementAreas": Provide a summary of specific areas where the resume could be improved (e.g., missing skills, unclear experience, formatting issues, lack of quantifiable achievements).
- "suggestedSkills": Suggest relevant skills to learn for upskilling, tailored to the user's profile and career goals.

Example feedback:
"feedback": {
  "rating": 7,
  "improvementAreas": ["Add more quantifiable achievements in work experience", "Include a professional summary", "Expand on technical skills"],
  "suggestedSkills": ["Docker", "AWS", "Unit Testing", "CI/CD"]
}
  
{
  "personalDetails": {
    "name": "",
    "email": "",
    "phone": "",
    "linkedin": "",
    "portfolio": ""
  },
  "summary": "",
  "workExperience": [],
  "education": [],
  "projects": [],
  "certifications": [],
  "skills": {
    "technical": [],
    "soft": []
  },
  "feedback": {
    "rating": 0,
    "improvementAreas": [],
    "suggestedSkills": []
  }
}

Resume Text:
${resumeText}
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON block using regex
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      console.error("No JSON object found in Gemini response:", text);
      throw new Error("Gemini did not return a JSON object");
    }
    const json = JSON.parse(match[0]);
    return json;
  } catch (err) {
    console.error("Gemini API error:", err);
    throw new Error("Gemini analysis failed");
  }
};

module.exports = { extractInfoFromGemini };