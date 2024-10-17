import { getUser } from "@workos-inc/authkit-nextjs";
import {
  AutoPaginatable,
  OrganizationMembership,
  WorkOS,
} from "@workos-inc/node";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { NEW_LISTING_CONSTANTS } from "../../utils/constants";

export default async function JobListing() {
  const { user } = await getUser();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-full bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Access Restricted
          </h2>
          <p className="text-gray-600 mb-6">
            You need to log in to post a job. Please sign in to continue.
          </p>
        </div>
      </div>
    );
  }

  interface OrganizationMembershipType {
    organizationId: string;
    status: string;
  }

  let organizationMemberShips: AutoPaginatable<OrganizationMembership> | null =
    null;
  if (user) {
    organizationMemberShips =
      await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
      });
  }

  const activeOrganisationMemberShips: OrganizationMembershipType[] = (
    organizationMemberShips?.data || []
  ).filter((om) => om.status === "active");

  const organizationNames: { [key: string]: string } = {};
  for (const activeMemberShip of activeOrganisationMemberShips) {
    const organization = await workos.organizations.getOrganization(
      activeMemberShip.organizationId
    );
    organizationNames[organization.id] = organization.name;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {NEW_LISTING_CONSTANTS.YOUR_COMPANIES}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {NEW_LISTING_CONSTANTS.SELECT_COMPANIES}
        </p>

        <div className="w-full mb-6">
          <div className="rounded-lg border divide-y divide-gray-200">
            {Object.keys(organizationNames).map((orgId) => (
              <Link
                key={orgId}
                href={"/new-listing/" + orgId}
                className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 transition"
              >
                <span className="text-gray-800">
                  {organizationNames[orgId]}
                </span>
                <FontAwesomeIcon
                  className="h-4 text-gray-500"
                  icon={faArrowRight}
                />
              </Link>
            ))}
          </div>
        </div>

        {!organizationMemberShips?.data && (
          <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg text-center text-blue-700 mb-6">
            {NEW_LISTING_CONSTANTS.NO_COMPANIES}
          </div>
        )}

        <Link
          href="/new-company"
          className="w-full bg-gray-200 px-4 py-3 text-center rounded-lg text-gray-800 hover:bg-gray-300 inline-flex justify-center items-center gap-2 transition"
        >
          Create a New Company Profile
          <FontAwesomeIcon className="h-4" icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
}
