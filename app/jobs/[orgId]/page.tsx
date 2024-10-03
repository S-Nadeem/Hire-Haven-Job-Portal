import Jobs from "@/app/components/Jobs";
import { addOrgData, JobModel } from "@/models/Job";
import { getUser } from "@workos-inc/authkit-nextjs";
import {
  AutoPaginatable,
  OrganizationMembership,
  WorkOS,
} from "@workos-inc/node";
import mongoose from "mongoose";
import React from "react";

type PageProps = {
  params: {
    orgId: string;
  };
};
export default async function CompanyJobsPage(props: PageProps) {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const org = await workos.organizations.getOrganization(props.params.orgId);
  const { user } = await getUser();
  let jobsDocs = JSON.parse(
    JSON.stringify(await JobModel.find({ orgId: org.id }))
  );
  jobsDocs = await addOrgData(jobsDocs, user);

  return (
    <>
      <div>
        <div className="container">
          <h1 className="text-3xl my-7">{org.name} Jobs</h1>
        </div>
        <Jobs jobs={jobsDocs} header={"Current Job Openings at " + org.name} />
      </div>
    </>
  );
}
