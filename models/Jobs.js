import mongoose, { Schema, models } from "mongoose";

const JobSchema = new Schema(
  {
    // The user who created the job
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Assigned handyman (optional at job creation)
    handymanId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Job category (e.g., Plumber, Electrician)
    category: {
      type: String,
      required: [true, "Job category is required"],
    },

    // Detailed description of the issue
    description: {
      type: String,
      required: [true, "Job description is required"],
    },

    // Optional image uploads (stored as URLs)
    images: {
      type: [String],
      default: [],
    },

    // Use postcode instead of coordinates for now
    postcode: {
      type: String,
      required: [true, "Postcode is required"],
      trim: true,
    },

    // Job status lifecycle
    status: {
      type: String,
      enum: ["open", "requested", "accepted", "rejected", "completed"],
      default: "open",
    },

    // Timestamps for each status transition
    requestedAt: { type: Date },
    acceptedAt: { type: Date },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

const Job = models.Job || mongoose.model("Job", JobSchema);
export default Job;
