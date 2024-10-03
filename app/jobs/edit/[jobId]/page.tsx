import JobForm from "@/app/components/JobForm";
import { JobModel } from "@/models/Job";
import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";

type PageProps = {
  params: {
    jobId: string;
  };
};
export default async function EditJobPage(props: PageProps) {
  const jobId = props.params.jobId;
  await mongoose.connect(process.env.MONGOOSE_CONNECT_URI as string);
  const jobDoc = JSON.parse(JSON.stringify(await JobModel.findById(jobId)));
  const { user } = await getUser();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  if (!user) {
    return <div className="container">You need to login First </div>;
  }
  if (!jobDoc) {
    return <div className="container">Not Found </div>;
  }
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: jobDoc.orgId,
  });
  if (oms.data.length === 0) {
    return <div className="container">Access Denied </div>;
  }

  return (
    <div>
      <JobForm orgId={jobDoc.orgId} jobDoc={jobDoc} />
    </div>
  );
}
