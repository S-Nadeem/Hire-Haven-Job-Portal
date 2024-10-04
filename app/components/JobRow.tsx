"use client";
import type { Job } from "@/models/Job";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimeAgo from "./TimeAgo";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function JobRow({ jobDoc }: { jobDoc: Job }) {
  const pathname = usePathname();
  const orgPagePath = `/jobs/${jobDoc?.orgId}`;

  return (
    <>
      {!jobDoc ? (
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm relative">
          <div className="absolute cursor-pointer top-4 right-4">
            <FontAwesomeIcon className="size-4 text-gray-400" icon={faHeart} />
          </div>
          <div className="flex flex-col lg:flex-row gap-4 items-start">
            <div className="w-[6rem] h-[6rem] lg:w-24 lg:h-24">
              <Image
                src={jobDoc?.Jobicon}
                alt="icon"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-grow">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div>
                    {pathname === orgPagePath ? (
                      <span className="text-gray-500 text-sm">
                        {jobDoc.orgName || "No Organization Info"}
                      </span>
                    ) : (
                      <Link
                        href={`jobs/${jobDoc?.orgId}`}
                        className="text-gray-500 hover:underline text-sm"
                      >
                        {jobDoc.orgName || "No Organization Info"}
                      </Link>
                    )}
                  </div>
                  <div>
                    {pathname === orgPagePath ? (
                      <span className="font-bold text-lg mb-1">
                        {jobDoc.title}
                      </span>
                    ) : (
                      <Link
                        href={`show/${jobDoc?._id}`}
                        className="font-bold text-lg mb-1 hover:underline"
                      >
                        {jobDoc.title}
                      </Link>
                    )}
                  </div>

                  <div className="text-gray-600 lg:text-sm text-[14px]">
                    {jobDoc.remote} &middot; {jobDoc.city}, {jobDoc.country}{" "}
                    &middot; {jobDoc.type}-time
                    {jobDoc.isAdmin && (
                      <>
                        {" "}
                        &middot;{" "}
                        <Link
                          className="text-blue-500 hover:underline"
                          href={"/jobs/edit/" + jobDoc._id}
                        >
                          Edit
                        </Link>{" "}
                        &middot;{" "}
                        <button
                          className="text-red-500 hover:underline"
                          type="button"
                          onClick={async () => {
                            await axios.delete("/api/jobs?id=" + jobDoc?._id);
                            window.location.reload();
                          }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {jobDoc.createdAt && (
              <div className="text-gray-500 text-sm lg:text-right lg:flex-shrink-0 mt-2 lg:mt-[35px]">
                <TimeAgo createdAt={jobDoc.createdAt} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
