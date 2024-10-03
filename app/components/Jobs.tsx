import type { Job } from "@/models/Job";
import JobRow from "./JobRow";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
export default function Jobs({
  header,
  jobs,
}: {
  header: string;
  jobs: Job[];
}) {
  return (
    <div className=" py-4 rounded-xl">
      <div className="container mx-auto  mb-[4rem] ">
        {jobs?.length ? (
          <h2 className="font-bold mb-4">{header || "Recent Jobs"}</h2>
        ) : (
          ""
        )}
        <div className="flex flex-col gap-6">
          {!jobs?.length && (
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                No Jobs Found
              </h2>
              <p className="text-gray-600 mb-8">
                We're sorry, but we couldn't find any jobs
              </p>
              <Link
                href={"/new-listing"}
                className="px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition duration-300"
              >
                Explore More Jobs
              </Link>
            </div>
          )}
          {jobs && jobs.length ? (
            jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white shadow-lg shadow-gray-300 p-4 rounded-lg"
                style={{
                  boxShadow:
                    "0 -5px 15px -5px rgba(0, 0, 0, 0.1), 0 5px 15px -5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <JobRow jobDoc={job} />
              </div>
            ))
          ) : (
            <Skeleton className="w-full h-[20px] rounded-full" />
          )}
        </div>
      </div>
    </div>
  );
}
