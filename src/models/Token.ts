import mongoose from "mongoose";
import crypto from "crypto";
// import sendEmail from "../utils/sendEmail"; // Function to send emails

const TokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 5 * 60 * 1000), // Expire in 15 mins
  },
});

// **PRE-SAVE: Generate Token & Send Email**


TokenSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.token = crypto.randomBytes(32).toString("hex");

    // Email content
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${this.token}&email=${this.email}`;
    // await sendEmail(this.email, "Verify your email", `Click to verify: ${verificationUrl}`);
  }
  next();
});


// **POST-SAVE: Auto-delete expired tokens**

TokenSchema.post("save", function (doc) {
  setTimeout(async () => {
    await mongoose.model("Token").deleteOne({ email: doc.email });
  }, 5 * 60 * 1000); // Auto-delete after 15 minutes
});

export default mongoose.models.Token || mongoose.model("Token", TokenSchema);
