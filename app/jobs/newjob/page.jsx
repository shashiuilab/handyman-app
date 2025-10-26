'use client';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import createJob from '@/app/actions/createJob';

// PrimeReact components
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useState } from 'react';

const PostNewJob = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [postcode, setPostcode] = useState('');

  const categoryOptions = [
    { label: 'Electrician', value: 'Electrician' },
    { label: 'Plumber', value: 'Plumber' },
    { label: 'Painter', value: 'Painter' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', category);
    formData.append('description', description);
    formData.append('postcode', postcode);

    startTransition(async () => {
      try {
        const res = await createJob(formData);
        if (res.success) {
          alert('Job created successfully!');
          router.push(`/jobs/newjob/nearbyHandyMan/?jobId=${res.jobId}&category=${res.category}&postcode=${res.postcode}`);
        }
      } catch (err) {
        console.error(err);
        alert('Failed to create job.');
      }
    });
  };

  return (
    <div className="flex justify-content-center mt-5 px-4">
      <Card
        title="Create a New Job"
        className="w-full md:w-5 surface-card shadow-3 border-round"
        style={{ backgroundColor: '#252929', color: 'white' }}
      >
        <form onSubmit={handleSubmit} className="p-fluid space-y-3">
          <div className="field">
            <label htmlFor="category" className="font-medium mb-2 block" style={{ color: '#46A397' }}>
              Category
            </label>
            <Dropdown
              id="category"
              value={category}
              options={categoryOptions}
              onChange={(e) => setCategory(e.value)}
              placeholder="Select Category"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="description" className="font-medium mb-2 block" style={{ color: '#46A397' }}>
              Description
            </label>
            <InputTextarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your job..."
              required
            />
          </div>

          <div className="field">
            <label htmlFor="images" className="font-medium mb-2 block" style={{ color: '#46A397' }}>
              Upload Images
            </label>
            <FileUpload
              id="images"
              name="images"
              mode="basic"
              chooseLabel="Choose"
              accept="image/*"
              multiple
              customUpload
              uploadHandler={(e) => console.log(e.files)}
              style={{ backgroundColor: '#46A397', borderRadius: '8px' }}
            />
          </div>

          <div className="field">
            <label htmlFor="postcode" className="font-medium mb-2 block" style={{ color: '#46A397' }}>
              Postcode
            </label>
            <InputText
              id="postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="Enter postcode"
              required
            />
          </div>

          <Divider />

          <Button
            type="submit"
            label={isPending ? 'Creating...' : 'Create Job'}
            loading={isPending}
            className="mt-3 p-button-rounded p-button-lg"
            style={{
              backgroundColor: '#46A397',
              border: 'none',
              color: 'white',
              fontWeight: '600',
            }}
          />
        </form>
      </Card>
    </div>
  );
};

export default PostNewJob;
