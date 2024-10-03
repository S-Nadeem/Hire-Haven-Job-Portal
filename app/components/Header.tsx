import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSignInUrl, getUser, signOut } from "@workos-inc/authkit-nextjs";
import Link from "next/link";

export default async function Header() {
  const { user } = await getUser();
  const signInUrl = await getSignInUrl();

  return (
    <header>
      <div className="container flex items-center justify-between mx-auto my-4">
        <Link href={"/"} className="font-bold text-xl">
          Hire Haven
        </Link>
        <nav className="flex items-center space-x-4">
          {!user && (
            <Link
              className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4"
              href={signInUrl}
            >
              Login
            </Link>
          )}
          {user && (
            <div className="w-10 h-10 bg-gray-600 text-white font-bold flex items-center justify-center rounded-full cursor-pointer">
              {user?.firstName ? (
                user.firstName[0]
              ) : (
                <FontAwesomeIcon icon={faFaceSmile} />
              )}
            </div>
          )}

          {user && (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4 hover:bg-gray-300"
              >
                Logout
              </button>
            </form>
          )}

          <Link
            className="rounded-md py-1 px-1  sm:py-2 sm:px-3 bg-blue-600 text-white hover:bg-blue-700"
            href={"/new-listing"}
          >
            Post a job
          </Link>
        </nav>
      </div>
    </header>
  );
}
