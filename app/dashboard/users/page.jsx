"use client";

import { useEffect, useState, useTransition } from "react";
import { getUserJobs } from "@/app/actions/userDashboardActions";
import Link from "next/link";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

export default function UserDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getUserJobs();
      setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-8" style={{ color: "var(--color-text)" }}>
        Loading your jobs...
      </p>
    );

  return (
    <div className="dashboard-container mx-3 md:mx-auto lg:mx-auto">
      <div className="flex align-items-center justify-content-between mb-4">
        <h1 className="dashboard-title">My Jobs</h1>
      </div>

      <Divider />

      {jobs.length === 0 ? (
        <p className="no-jobs-text">You haven’t posted any jobs yet.</p>
      ) : (
        <div className="flex flex-column gap-4">
          {jobs.map((job) => (
            <Card
              key={job._id}
              className="job-card"
              title={
                <div className="flex align-items-center justify-content-between">
                  <span>{job.category}</span>
                  <Tag
                    value={job.status}
                    severity={
                      job.status === "requested"
                        ? "info"
                        : job.status === "accepted"
                        ? "success"
                        : job.status === "rejected"
                        ? "danger"
                        : "secondary"
                    }
                  />
                </div>
              }
            >
              <p className="m-0 job-description">{job.description}</p>

              {job.images && job.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.images.map((imgUrl, index) => (
                    <img
                      key={index}
                      src={imgUrl}
                      alt={`Job Image ${index + 1}`}
                      className="job-image"
                    />
                  ))}
                </div>
              )}

              <div className="flex align-items-center justify-content-between mt-3">
                <p className="m-0">
                  Status:{" "}
                  <span className="font-semibold status-text">
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </p>
                <Link href={`/jobs/${job._id}`}>
                  <Button
                    label="View Details →"
                    className="p-button-text p-button-sm"
                  />
                </Link>
              </div>

              {job.handymanId && (
                <>
                  <Divider />
                  <div className="flex align-items-center gap-3 mt-2">
                    <img
                      src={job.handymanId.image || "/default-avatar.png"}
                      alt={job.handymanId.username}
                      className="handyman-avatar"
                    />
                    <div>
                      <p className="font-medium">{job.handymanId.username}</p>
                      <p className="text-sm text-gray-400">
                        📞 {job.handymanId.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
