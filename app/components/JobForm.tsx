"use client";
import {
  faEnvelope,
  faPhone,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  RadioGroup,
  TextArea,
  TextField,
  Theme,
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useState } from "react";
// @ts-ignore
// prettier-ignore
import {CitySelect, CountrySelect, StateSelect,} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { ImageUpload } from "./ImageUpload";
import { saveJobAction } from "../actions/JobActions";
import { redirect } from "next/navigation";
import type { Job } from "@/models/Job";

export default function JobForm({
  orgId,
  jobDoc,
}: {
  orgId: string;
  jobDoc?: Job;
}) {
  const [countryId, setCountrId] = useState(jobDoc?.countryId || "0");
  const [stateId, setstateId] = useState(jobDoc?.stateId || "0");
  const [cityId, setcityId] = useState(jobDoc?.cityId || "0");
  const [countryName, setcountryName] = useState(jobDoc?.country || "");
  const [stateName, setstateName] = useState(jobDoc?.state || "");
  const [cityName, setcityName] = useState(jobDoc?.city || "");

  const handleSaveJob = async (data: FormData) => {
    data.set("country", countryName.toString());
    data.set("state", stateName.toString());
    data.set("city", cityName.toString());
    data.set("countryId", countryId.toString());
    data.set("stateId", stateId.toString());
    data.set("cityId", cityId.toString());
    data.set("orgId", orgId);
    const jobDoc = await saveJobAction(data);
    redirect(`/jobs/${jobDoc.orgId}`);
  };
  return (
    <Theme>
      <form action={handleSaveJob} className="container flex flex-col gap-4">
        {jobDoc && <input type="hidden" name="id" value={jobDoc?._id} />}
        <TextField.Root
          name="title"
          placeholder="Job title"
          defaultValue={jobDoc?.title || ""}
        />

        <div className="grid sm:grid-cols-3 gap-6 *:grow ">
          <div>
            Remote?
            <RadioGroup.Root
              defaultValue={jobDoc?.remote || "hybrid"}
              name="remote"
            >
              <RadioGroup.Item value="onsite">Onsite</RadioGroup.Item>
              <RadioGroup.Item value="hybrid">Hybrid-Remote</RadioGroup.Item>
              <RadioGroup.Item value="remote">Remote</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Full time?
            <RadioGroup.Root defaultValue={jobDoc?.type || "full"} name="type">
              <RadioGroup.Item value="full">Full-time</RadioGroup.Item>
              <RadioGroup.Item value="project">Project</RadioGroup.Item>
              <RadioGroup.Item value="part">Part-Time</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Salary
            <TextField.Root
              className="mt-2"
              name="salary"
              defaultValue={jobDoc?.salary || ""}
            >
              <TextField.Slot>₹</TextField.Slot>
              <TextField.Slot>L/year</TextField.Slot>
            </TextField.Root>
          </div>
        </div>
        <div>
          Location
          <div className="flex flex-col sm:flex-row gap-4 *:grow mt-2">
            <CountrySelect
              value={countryId ? { id: countryId, name: countryName } : null}
              onChange={(e: any) => {
                setCountrId(e.id);
                setcountryName(e.name);
              }}
              placeHolder="Select Country"
            />

            <StateSelect
              value={stateId ? { id: stateId, name: stateName } : null}
              countryid={countryId}
              onChange={(e: any) => {
                setstateId(e.id);
                setstateName(e.name);
              }}
              placeHolder="Select State"
            />

            <CitySelect
              value={cityId ? { id: cityId, name: cityName } : null}
              countryid={countryId}
              stateid={stateId}
              onChange={(e: any) => {
                setcityId(e.id);
                setcityName(e.name);
              }}
              placeHolder="Select City"
            />
          </div>
        </div>
        <div className="sm:flex">
          <div className="w-1/3">
            <h3 className="mb-2"> Job Icon</h3>
            <ImageUpload
              name="Jobicon"
              icon={faStar}
              defaultValue={jobDoc?.Jobicon || ""}
            />
          </div>

          <div className="grow">
            <h3 className="mb-2">Contact Person</h3>
            <div className="flex gap-2">
              <div>
                <ImageUpload
                  name="contactPhoto"
                  icon={faUser}
                  defaultValue={jobDoc?.contactPhoto || ""}
                />
              </div>
              <div className="grow flex flex-col gap-1">
                <TextField.Root
                  placeholder="John Doe"
                  name="contactName"
                  defaultValue={jobDoc?.contactName || ""}
                >
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faUser} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  placeholder="Phone"
                  type="tel"
                  name="contactPhone"
                  defaultValue={jobDoc?.contactPhone || ""}
                >
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faPhone} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  placeholder="Email"
                  type="email"
                  name="contactEmail"
                  defaultValue={jobDoc?.contactEmail || ""}
                >
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </TextField.Slot>
                </TextField.Root>
              </div>
            </div>
          </div>
        </div>
        <TextArea
          resize="vertical"
          placeholder="Job Description"
          name="description"
          defaultValue={jobDoc?.description || ""}
          className="mb-3"
        />
        <div className="flex justify-center mb-5">
          <Button size="3">
            <span className="px-8">Save</span>
          </Button>
        </div>
      </form>
    </Theme>
  );
}
