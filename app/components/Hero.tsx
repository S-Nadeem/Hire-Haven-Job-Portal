import { HERO_PAGE } from "@/utils/constants";

export default async function Hero() {
  return (
    <section className="container my-16">
      <h1 className="text-4xl font-bold text-center">
        {HERO_PAGE.LAND_JOB}
        <br />
        {HERO_PAGE.JOB_TODAY}
      </h1>
    </section>
  );
}
