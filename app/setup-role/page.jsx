'use client';
import { useState } from 'react';
import { FaUser, FaToolbox } from 'react-icons/fa';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import updateUserProfile from '@/app/actions/updateUserProfile';
import { classNames } from 'primereact/utils';

const SetupRolePage = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedRole) return;
    await updateUserProfile({ role: selectedRole });
  };

  return (
    <div className="flex justify-content-center min-h-prose surface-section">
      <Card className="w-prose md:w-7 surface-card p-5 shadow-3 border-round-2 mt-6">
        <form onSubmit={handleSubmit} className="flex flex-column align-items-center gap-4">
          <h1 className="text-1xl font-semibold text-primary m-0">
            Choose your role
          </h1>

          <div className="flex flex-column md:flex-row gap-3 justify-content-center mt-3">
            <Button
              type="submit"
              name="role"
              value="user"
              label="I am a User"
              icon={<FaUser className="md:mr-3 mr-1" />}
              className={classNames(
                'p-button-rounded p-button-lg',
                selectedRole === 'user' ? 'p-button-primary' : 'p-button-outlined'
              )}
              onClick={() => setSelectedRole('user')}
            />

            <Button
              type="submit"
              name="role"
              value="handyman"
              label="I am a Handy Man"
              icon={<FaToolbox className="md:mr-3 mr-1" />}
              className={classNames(
                'p-button-rounded p-button-lg',
                selectedRole === 'handyman' ? 'p-button-primary' : 'p-button-outlined'
              )}
              onClick={() => setSelectedRole('handyman')}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SetupRolePage;
