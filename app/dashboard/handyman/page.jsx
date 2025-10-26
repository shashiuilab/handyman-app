"use client";

import { useEffect, useState, useTransition } from "react";
import {
  getAssignedJobs,
  toggleAvailability,
  updateJobStatus,
} from "@/app/actions/handymanDashboardActions";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";

export default function HandymanDashboard() {
  const [jobs, setJobs] = useState([]);
  const [available, setAvailable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAssignedJobs();
      setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const handleAvailabilityToggle = () => {
    const newValue = !available;
    setAvailable(newValue);
    startTransition(async () => {
      await toggleAvailability(newValue);
    });
  };

  const handleJobAction = (jobId, status) => {
    startTransition(async () => {
      await updateJobStatus(jobId, status);
      alert(`Job ${status}`);
      const data = await getAssignedJobs();
      setJobs(data);
    });
  };

  if (loading)
    return (
      <p className="text-center mt-8" style={{ color: "var(--color-text)" }}>
        Loading dashboard...
      </p>
    );

  return (
    <div className="handyman-dashboard-container mx-3 md:mx-auto lg:mx-auto">
      {/* Header Section */}
      <h1 className="dashboard-title mb-3">Handyman Dashboard</h1>
      <div className="flex align-items-center justify-content-between mb-4">
        <div className="flex align-items-center gap-3">
          <label htmlFor="availability" className="font-medium">
            Available
          </label>
          <InputSwitch
            id="availability"
            checked={available}
            onChange={handleAvailabilityToggle}
          />
        </div>
      </div>

      <Divider />

      {/* Jobs List */}
      {jobs.length === 0 ? (
        <p className="no-jobs-text">No assigned jobs yet.</p>
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

              {job.status === "requested" && (
                <div className="flex gap-3 mt-3">
                  <Button
                    label="Accept"
                    className="p-button-sm p-button-success flex-1"
                    onClick={() => handleJobAction(job._id, "accepted")}
                    disabled={isPending}
                  />
                  <Button
                    label="Reject"
                    className="p-button-sm p-button-danger flex-1"
                    onClick={() => handleJobAction(job._id, "rejected")}
                    disabled={isPending}
                  />
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
