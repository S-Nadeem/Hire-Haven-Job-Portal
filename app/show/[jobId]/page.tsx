import { JobModel } from "@/models/Job";
import mongoose from "mongoose";
import Image from "next/image";
import JobIconDefault from "../../../assests/jobIconDefault.png";
import userImage from "../../../assests/userImage.png";

type PageProps = {
  params: {
    jobId: string;
  };
};

export default async function SinglePageJob(props: PageProps) {
  const jobId = props.params.jobId;
  await mongoose.connect(process.env.MONGOOSE_CONNECT_URI as string);
  const jobDoc = await JobModel.findById(jobId);
  return (
    <div className="container">
      <div className="sm:flex">
        <div className="grow">
          <h1 className="text-4xl font-semibold mb-2">{jobDoc?.title}</h1>
          <div className=" text-lg capitalize text-blue-800 mb-4">
            {jobDoc.remote} &middot; {jobDoc.city}, {jobDoc.country}{" "}
          </div>
        </div>
        <div>
          {jobDoc?.jobIcon ? (
            <Image
              alt="jobIcon"
              src={jobDoc?.jobIcon}
              className="w-24 h-24 rounded-full mr-6 object-cover"
              loading="lazy"
              width={96}
              height={96}
            />
          ) : (
            <Image
              src={JobIconDefault}
              alt="icon"
              className="w-[65%] h-[65%] object-contain"
              width={70}
              height={70}
            />
          )}
        </div>
      </div>
      <div className="whitespace-pre-line text-gray-800 mb-8">
        {jobDoc?.description}
      </div>
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mb-10 border border-black">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Contact for Job Opportunity
        </h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-start p-4 rounded-md space-y-4 sm:space-y-0 sm:space-x-6">
          {jobDoc?.contactPhoto ? (
            <Image
              src={jobDoc?.contactPhoto}
              alt="Contact"
              className="w-24 h-24 rounded-full object-cover"
              loading="lazy"
              width={96}
              height={96}
            />
          ) : (
            <Image
              src={userImage}
              alt="icon"
              className="w-24 h-24 rounded-full object-cover"
              width={70}
              height={70}
            />
          )}

          <div className="text-left">
            <p className="text-base font-medium text-gray-700 mb-1">
              {jobDoc?.contactName}
            </p>
            <p>
              <span className="text-sm text-gray-600">Email: </span>
              <a
                href={`mailto:${jobDoc?.contactEmail}`}
                className="text-sm text-gray-600 hover:underline font-semibold"
              >
                {jobDoc?.contactEmail}
              </a>
            </p>
            <p>
              <span className="text-sm text-gray-600">Phone: </span>
              <a
                href={`tel:${jobDoc?.contactPhone}`}
                className="text-sm text-gray-600 hover:underline font-semibold"
              >
                {jobDoc?.contactPhone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
