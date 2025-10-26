'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getUserJobs } from '@/app/actions/userDashboardActions';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';

export default function JobDetails() {
  const params = useParams();
  const jobId = params.id;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      const jobs = await getUserJobs();
      const selectedJob = jobs.find((j) => j._id === jobId);
      setJob(selectedJob);
      setLoading(false);
    };
    fetchJob();
  }, [jobId]);

  if (loading)
    return <p className="text-center mt-8" style={{ color: 'var(--color-text)' }}>Loading job details...</p>;

  if (!job)
    return <p className="text-center mt-8" style={{ color: 'var(--color-text)' }}>Job not found.</p>;

  return (
    <div className="dashboard-container  mx-3 md:mx-auto lg:mx-auto">
      <h1 className="dashboard-title">{job.category}</h1>
      <Divider />

      <Card className="job-card">
        <p className="m-0 job-description">{job.description}</p>

        <div className="mt-3">
          <p className="m-0">
            <span className="font-semibold">Postcode:</span> {job.postcode}
          </p>
          <p className="m-0 mt-2">
            <span className="font-semibold">Status:</span>{' '}
            <Tag
              value={job.status}
              severity={
                job.status === 'requested'
                  ? 'info'
                  : job.status === 'accepted'
                  ? 'success'
                  : job.status === 'rejected'
                  ? 'danger'
                  : 'secondary'
              }
            />
          </p>
        </div>

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

        <Divider />

        {job.handymanId ? (
          <div className="mt-3">
            <h2 className="font-semibold text-lg mb-2">Assigned Handyman</h2>
            <div className="flex align-items-center gap-3">
              <img
                src={job.handymanId.image || '/default-avatar.png'}
                alt={job.handymanId.username}
                className="handyman-avatar"
              />
              <div>
                <p className="font-medium">{job.handymanId.username}</p>
                <p className="text-sm text-gray-400">
                  📞 {job.handymanId.phone || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 mt-3">No handyman assigned yet.</p>
        )}
      </Card>
    </div>
  );
}
