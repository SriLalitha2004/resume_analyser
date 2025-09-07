import { Skeleton } from "@/components/ui/skeleton";

export default function AnalysisSkeleton() {
  return (
    <div className="space-y-4">
      {Array(4)
        .fill()
        .map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
    </div>
  );
}