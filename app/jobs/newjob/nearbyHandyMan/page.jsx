'use client';

import { useState, useTransition, useEffect, useRef } from 'react';
import { getNearbyHandymen, sendJobRequest } from '@/app/actions/searchHandyManAndAssign';
import { useSearchParams } from 'next/navigation';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Divider } from 'primereact/divider';

export default function NearbyHandymen() {
  const toast = useRef(null);
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');
  const category = searchParams.get('category');
  const postcode = searchParams.get('postcode');

  const [handymen, setHandymen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchHandymen = async () => {
      try {
        const data = await getNearbyHandymen({ category, postcode });
        setHandymen(data);
        if (data.length === 0) {
          toast.current.show({
            severity: 'info',
            summary: 'No Handymen Found',
            detail: `No available handymen found for category "${category}".`,
            life: 4000,
          });
        }
      } catch (err) {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch handymen. Please try again.',
          life: 4000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchHandymen();
  }, [category, postcode]);

  const handleSendRequest = (handymanId) => {
    startTransition(async () => {
      try {
        await sendJobRequest({ jobId, handymanId });
        toast.current.show({
          severity: 'success',
          summary: 'Request Sent',
          detail: 'Job request sent successfully!',
          life: 4000,
        });
      } catch (err) {
        console.error(err);
        toast.current.show({
          severity: 'error',
          summary: 'Failed',
          detail: 'Failed to send job request.',
          life: 4000,
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center min-h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div className="surface-section p-4 flex flex-column align-items-center">
      <Toast ref={toast} position="top-right" />

      <div className="flex flex-column align-items-center mb-4">
        <h1 className="text-2xl font-bold text-[#46A397]">Available Handymen Nearby</h1>
        <Divider className="w-8rem" />
      </div>

      {handymen.length === 0 ? (
        <div className="flex justify-content-center">
          <p className="text-white">No available handymen found nearby.</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-content-center gap-4 px-3 md:px-0">
          {handymen.map((man) => (
            <Card
              key={man._id}
              title={man.username}
              subTitle={man.services?.join(', ')}
              className="surface-card shadow-3 border-round p-3 flex flex-column align-items-center"
            >
              <img
                src={man.image || '/default-avatar.png'}
                alt={man.username}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  marginBottom: '1rem',
                }}
              />
              <p className="text-sm">Experience: {man.experience || 'N/A'}</p>
              <p className="text-sm">Rate: ₹{man.rate || 'N/A'}/hr</p>

              <Button
                label={isPending ? 'Sending...' : 'Send Request'}
                icon="pi pi-send"
                onClick={() => handleSendRequest(man._id)}
                disabled={isPending}
                className="mt-3 p-button-success"
                style={{ backgroundColor: '#46A397', border: 'none' }}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
