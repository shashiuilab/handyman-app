"use client";

import updateHandyManDetails from "@/app/actions/updateHandyManDetails";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";
import { useState } from "react";

const UpdateHandyManDetails = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [available, setAvailable] = useState(false);

  const handleServiceChange = (service) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    setSelectedServices(updated);
  };

  return (
    <Card className="p-fluid handyman-card mx-3 md:mx-auto lg:mx-auto px-0">
      <form action={updateHandyManDetails} className="flex flex-column gap-5">
        {/* Step 1 */}
        <section>
          <div className="flex align-items-center gap-2 mb-3">
            <h3 className="m-0 yellow-accent">Enter Your Details:</h3>
          </div>
          <label htmlFor="service_description" className="font-bold mb-2 block">
            Description
          </label>
          <InputTextarea
            id="service_description"
            name="service_description"
            rows={4}
            placeholder="Describe your services and specialties"
          />
        </section>

        <Divider />

        {/* Step 2 */}
        <section>
          <div className="flex align-items-center gap-2 mb-3">
            <h3 className="m-0 step-title">Location Details</h3>
          </div>

          <div className="flex flex-column gap-2">
            <InputText name="location.street" placeholder="Street" />
            <InputText name="location.city" placeholder="City" required />
            <InputText name="location.state" placeholder="State" required />
            <InputText name="location.zipcode" placeholder="Zipcode" />
          </div>
        </section>

        <Divider />

        {/* Step 3 */}
        <section>
          <div className="flex align-items-center gap-2 mb-3">
            <h3 className="m-0 step-title">Choose Your Services</h3>
          </div>

          <div className="flex flex-wrap gap-4">
            {["Electrician", "Plumber", "Painter", "Carpenter", "Cleaner"].map(
              (service) => (
                <div key={service} className="flex align-items-center gap-2">
                  <Checkbox
                    inputId={service}
                    name="services"
                    value={service}
                    checked={selectedServices.includes(service)}
                    onChange={() => handleServiceChange(service)}
                  />
                  <label htmlFor={service}>{service}</label>
                </div>
              )
            )}
          </div>
        </section>

        <Divider />

        {/* Step 4 */}
        <section>
          <div className="flex align-items-center gap-2 mb-3">
            <h3 className="m-0 step-title">Work Experience</h3>
          </div>

          <InputTextarea
            id="service_experience"
            name="service_experience"
            rows={4}
            placeholder="Add your work experience, certifications, or previous jobs"
          />
        </section>

        <Divider />

        {/* Step 5 */}
        <section>
          <div className="flex align-items-center gap-2 mb-3">
            <h3 className="m-0 step-title">Set Your Rates</h3>
          </div>

          <div className="flex align-items-center gap-2">
            <label htmlFor="service_weekly_rate" className="font-bold">
              Hourly
            </label>
            <InputText
              type="number"
              name="rates.hourly"
              placeholder="e.g. 500"
            />
          </div>
        </section>

        <Divider />

        {/* Step 6 */}
        <section>
          <div className="flex align-items-center gap-2 mb-3">
            <h3 className="m-0 step-title">Personal Information</h3>
          </div>

          <div className="flex flex-column gap-3">
            <InputText name="service_name" placeholder="Full Name" />
            <InputText
              name="service_email"
              type="email"
              placeholder="Email address"
              required
            />
            <InputText name="service_phone" type="tel" placeholder="Phone" />
          </div>
        </section>

        <Divider />

        {/* Step 7 */}
        <section>
          <div className="flex align-items-center gap-2 mb-3">
            <h3 className="m-0 step-title">Availability</h3>
          </div>

          <div className="flex align-items-center gap-3">
            <label htmlFor="service_available" className="font-bold">
              Available
            </label>
            <InputSwitch
              id="service_available"
              className=""
              checked={available}
              onChange={(e) => setAvailable(e.value)}
            />
            <input
              type="hidden"
              name="service_available"
              value={available ? "true" : "false"}
            />
          </div>
        </section>

        {/* Submit */}
        <Button
          label="Register me as Handyman"
          type="submit"
          className="p-button-rounded w-full submit-btn"
        />
      </form>
    </Card>
  );
};

export default UpdateHandyManDetails;
