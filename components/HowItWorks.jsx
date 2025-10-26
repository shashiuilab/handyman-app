"use client";

import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

export const HowItWorks = () => {
  const userSteps = [
    {
      title: "1. Post Your Job",
      description:
        "Describe the issue, upload photos if needed, and enter your location to reach the nearest handymen.",
    },
    {
      title: "2. Browse Nearby Handymen",
      description:
        "View verified professionals with their skills, experience, and hourly rates.",
    },
    {
      title: "3. Send a Request",
      description:
        "Select the right handyman and send them a service request instantly.",
    },
    {
      title: "4. Get It Done",
      description:
        "Once accepted, relax while your task gets completed quickly and reliably.",
    },
  ];

  const handymanSteps = [
    {
      title: "1. Register as a Handyman",
      description:
        "Create your profile and showcase your skills, experience, and service areas.",
    },
    {
      title: "2. Set Availability",
      description:
        "Stay visible to nearby users by marking your availability and preferred service radius.",
    },
    {
      title: "3. Receive Job Requests",
      description:
        "Get notifications for new requests from customers near you and review job details.",
    },
    {
      title: "4. Accept & Complete Jobs",
      description:
        "Accept requests, complete the tasks, and grow your reputation with ratings and reviews.",
    },
  ];

  const renderSteps = (steps) => (
    <div className="flex flex-wrap justify-content-center gap-4 mt-4 w-full font-light">
      {steps.map((step, i) => (
        <Card
          key={i}
          title={<p className="font-light text-xl">{step.title}</p>}
          subTitle={step.description}
          className="w-11 md:w-4 lg:w-2 surface-card text-white border-round shadow-3"
          style={{
            backgroundColor: "#2e2e2e",
            border: "1px solid #46A39733",
            minHeight: "150px",
          }}
        />
      ))}
    </div>
  );

  return (
    <div
      className="flex flex-column align-items-center justify-content-center  px-3 w-full"
      style={{
        backgroundColor: "#252929",
        color: "#fff",
      }}
    >
      <h2
        className="text-4xl font-bold my-4 text-center yellow-accent"
      >
        How It Works
      </h2>

      <Divider align="center">
        <span className="text-lg font-semibold orange-accent">
          For Users
        </span>
      </Divider>

      {renderSteps(userSteps)}

      <Divider align="center">
        <span className="text-lg font-semibold orange-accent">
          For Handymen
        </span>
      </Divider>

      {renderSteps(handymanSteps)}
    </div>
  );
};
