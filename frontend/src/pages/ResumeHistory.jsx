import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
import ResumeCard from "@/components/ResumeCard";

function ResumeHistory() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/resumes`
      );
      setResumes(response.data);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to fetch resumes");
    } finally {
      setLoading(false);
    }
  };

  const openDetails = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/resumes/${id}`
      );
      setSelectedResume(response.data.data); // .data is the structured JSON
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to fetch resume details"
      );
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📋 Resume History</h2>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded" />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="text-left p-2">#</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">File</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((resume, index) => (
                <tr key={resume.id} className="border-t">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{resume.name}</td>
                  <td className="p-2">{resume.email}</td>
                  <td className="p-2">{resume.filename}</td>
                  <td className="p-2">
                    {new Date(resume.created_at).toLocaleString()}
                  </td>
                  <td className="p-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => openDetails(resume.id)}
                        >
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Resume Details</DialogTitle>
                        </DialogHeader>
                        {selectedResume ? (
                          <ResumeCard data={selectedResume} />
                        ) : (
                          <p className="text-sm text-gray-500">Loading...</p>
                        )}
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default ResumeHistory;