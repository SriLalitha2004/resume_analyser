import { useState, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnalysisSkeleton from "@/components/AnalysisSkeleton";
import { Lock } from "lucide-react";

function LiveAnalysis() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    setFile(selectedFile);
    setAnalysis(null);
    toast.success("File uploaded. Analyzing...");

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setAnalysis(response.data.analysis);
      toast.success("Resume analyzed successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#e0e7ff] to-[#ede9fe] flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 text-balance">
          Is your resume good enough?
        </h1>

        <p className=" text-gray-600 ">
          Instantly scan your resume with 16+ smart checks and get actionable
          feedback to boost your interview chances.
        </p>

        {/* Upload Card */}
        <Card className="border-2 border-dashed border-gray-300 shadow-lg">
          <CardContent className="space-y-4 py-8 px-6">
            {/* Hidden file input */}
            <Input
              type="file"
              accept=".pdf"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {file && (
              <p className="text-sm text-gray-600">Selected: {file.name}</p>
            )}

            <p className="text-gray-500 text-sm">
              Upload your resume in PDF format for analysis.
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              {loading ? <AnalysisSkeleton /> : "Upload Your Resume"}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
              <Lock size={14} />
              <span>Privacy guaranteed</span>
            </div>
          </CardContent>
        </Card>

        <ToastContainer />

        {/* Analysis Result */}
        {analysis && (
          <div className="space-y-6 text-left">
            <ResumeSection title="👤 Personal Details">
              <ul>
                <li>
                  <strong>Name:</strong> {analysis.personalDetails?.name}
                </li>
                <li>
                  <strong>Email:</strong> {analysis.personalDetails?.email}
                </li>
                <li>
                  <strong>Phone:</strong> {analysis.personalDetails?.phone}
                </li>
                <li>
                  <strong>LinkedIn:</strong>{" "}
                  {analysis.personalDetails?.linkedin}
                </li>
                <li>
                  <strong>Portfolio:</strong>{" "}
                  {analysis.personalDetails?.portfolio}
                </li>
              </ul>
            </ResumeSection>

            <ResumeSection title="📝 Summary">
              <p>{analysis.summary}</p>
            </ResumeSection>

            <ResumeSection title="🛠 Technical Skills">
              <ul className="list-disc list-inside">
                {analysis.skills?.technical?.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </ResumeSection>

            <ResumeSection title="🤝 Soft Skills">
              <ul className="list-disc list-inside">
                {analysis.skills?.soft?.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </ResumeSection>

            <ResumeSection title="⭐ AI Feedback">
              <p className="flex items-center gap-2">
                <strong>Rating:</strong> {analysis.feedback?.rating} / 10
                <span className="text-yellow-500">
                  {"★".repeat(Math.round(analysis.feedback?.rating || 0))}
                  {"☆".repeat(10 - Math.round(analysis.feedback?.rating || 0))}
                </span>
              </p>
              <p>
                <strong>Improvement Areas:</strong>
              </p>
              <ul className="list-disc list-inside">
                {analysis.feedback?.improvementAreas?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p>
                <strong>Suggested Skills:</strong>
              </p>
              <ul className="list-disc list-inside">
                {analysis.feedback?.suggestedSkills?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </ResumeSection>
          </div>
        )}
      </div>
    </div>
  );
}

function ResumeSection({ title, children }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        {children}
      </CardContent>
    </Card>
  );
}

export default LiveAnalysis;