import { HERO_PAGE } from "@/utils/constants";

export default async function Hero() {
  return (
    <section className="container my-16">
      <h1 className="text-4xl font-bold text-center">
        {HERO_PAGE.LAND_JOB}
        <br />
        {HERO_PAGE.JOB_TODAY}
      </h1>
      {/* 
      <form className="flex gap-2 mt-4 max-w-md mx-auto">
        <input
          type="search"
          className="border border-gray-400 w-full py-2 px-3 rounded-md"
          placeholder="Search phrase.."
        />
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Search
        </button>
      </form> */}
    </section>
  );
}
