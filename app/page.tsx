import React from "react";
import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import { addOrgData, JobModel } from "@/models/Job";
import { getUser } from "@workos-inc/authkit-nextjs";
import mongoose from "mongoose";
import Head from "next/head";
import hirehaven from "../hireHavenFav.png";

const HomePage = async () => {
  const { user } = await getUser();
  await mongoose.connect(process.env.MONGOOSE_CONNECT_URI as string);
  const latestJobs = await addOrgData(
    await JobModel.find({}, {}, { limit: 5, sort: "-createdAt" }),
    user
  );

  return (
    <>
      <Head>
        <link rel="icon" href={hirehaven.src} />
      </Head>
      <div>
        <Hero />
        <Jobs header={""} jobs={latestJobs} />
      </div>
    </>
  );
};

export default HomePage;
