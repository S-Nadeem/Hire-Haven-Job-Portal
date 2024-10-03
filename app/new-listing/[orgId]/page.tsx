import JobForm from "@/app/components/JobForm";
import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function NewOrgnisationPage(props: PageProps) {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const { user } = await getUser();

  if (!user) {
    return (
      <div className="container text-lg">
        <div className="flex justify-center items-center  p-4 mb-10">
          <div className="max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 ">
              You appear to be logged out. Please log in to access your account.
            </h2>
          </div>
        </div>
      </div>
    );
  }

  const orgId = props.params.orgId;
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: orgId,
  });
  const hasAccess = oms.data.length > 0;

  if (!hasAccess) {
    return <div className="container">No Access</div>;
  }

  return (
    <>
      <JobForm orgId={orgId} />
    </>
  );
}
