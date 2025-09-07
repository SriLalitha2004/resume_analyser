import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ResumeCard({ data }) {
  const { personalDetails, summary, skills, feedback } = data;

  return (
    <div className="space-y-4">
      <ResumeSection title="👤 Personal Details">
        <ul>
          <li>
            <strong>Name:</strong> {personalDetails?.name}
          </li>
          <li>
            <strong>Email:</strong> {personalDetails?.email}
          </li>
          <li>
            <strong>Phone:</strong> {personalDetails?.phone}
          </li>
          <li>
            <strong>LinkedIn:</strong> {personalDetails?.linkedin}
          </li>
          <li>
            <strong>Portfolio:</strong> {personalDetails?.portfolio}
          </li>
        </ul>
      </ResumeSection>

      <ResumeSection title="📝 Summary">
        <p>{summary}</p>
      </ResumeSection>

      <ResumeSection title="🛠 Technical Skills">
        <ul className="list-disc list-inside">
          {skills?.technical?.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title="🤝 Soft Skills">
        <ul className="list-disc list-inside">
          {skills?.soft?.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title="⭐ AI Feedback">
        <p>
          <strong>Rating:</strong> {feedback?.rating} / 10
        </p>
        <p>
          <strong>Improvement Areas:</strong>
        </p>
        <ul className="list-disc list-inside">
          {feedback?.improvementAreas?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p>
          <strong>Suggested Skills:</strong>
        </p>
        <ul className="list-disc list-inside">
          {feedback?.suggestedSkills?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </ResumeSection>
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