import { getUser } from "@workos-inc/authkit-nextjs";
import { createCompany } from "../actions/workosAction";
import React from "react";

export default async function CreateNewCompany() {
  const { user } = await getUser();
  async function handleNewCompanyFormSubmit(data: FormData) {
    "use server";
    if (user) {
      await createCompany(data.get("newCompanyName") as string, user.id);
    }
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-full bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Create a New Company
          </h2>
          <p className="text-gray-600 text-center mb-6">
            To create a job listing, first you need to register a company.
          </p>
          <form
            action={handleNewCompanyFormSubmit}
            className="flex flex-col items-center gap-4"
          >
            <input
              name="newCompanyName"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Enter Company Name"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Create Company
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
