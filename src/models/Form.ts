import mongoose, { Schema, Document } from "mongoose";

// Interface for Form Document
export interface IForm extends Document {
  title: string;
  description?: string;
  status: "draft" | "published" | "archived";
  language: string;
  saveAsTemplate: boolean;
  tags: mongoose.Types.ObjectId[]; 

  
  design: {
    theme: string;
    primaryColor: string;
    colorMode: "light" | "dark" | "auto";
    fontStyle: string;
    uppercaseLabels: boolean;
    backgroundImage?: string;
    backgroundColor?: string;
  };

  layout: {
    inputSize: "small" | "medium" | "large";
    inputRoundness: "small" | "medium" | "large";
    width: "full-width" | "centered";
    rtl: boolean;
  };

  branding: {
    logo?: string;
    colorImage?: string;
    removeBranding: boolean;
  };

  advanced: {
    hideFormTitle: boolean;
    showProgressBar: boolean;
    transparentBackground: boolean;
    confettiOnSuccess: boolean;
  };

  fields: mongoose.Types.ObjectId[]; // References Field Schema
  createdBy: mongoose.Types.ObjectId; // References User Schema

  formSettings: FormSettings;
  analytics: {
    formViews: number;
    submissions: number;
    submissionRate: number;
  };
}

// **Settings Interfaces**
export interface FormSettings {
  submission: SubmissionSettings;
  security: SecuritySettings;
  link: LinkSettings;
}

// Submission Settings
export interface SubmissionSettings {
  submitButtonText: string;
  autoSave: boolean;
  databaseAction: "create" | "update";
  updateProperties?: string[];
  afterSubmission: {
    action: "successPage" | "redirect";
    redirectURL?: string;
    successTextHeading?: string;
    successTextDescription?: string;
    reFillable: boolean;
    editableSubmission: boolean;
  };
}

// Security & Access Settings
export interface SecuritySettings {
  password?: string;
  closingDate?: Date;
  closedFormText?: string;
  submissionLimit?: number;
  maxSubmissionsText?: string;
  botProtection: {
    enabled: boolean;
    provider: "reCAPTCHA" | "hCaptcha";
  };
}

// Link Settings
export interface LinkSettings {
  pageTitle: string;
  pageDescription: string;
  thumbnail: string;
  favicon: string;
}





// **Mongoose Schema for Form**



const FormSchema = new Schema<IForm>(
  {
    
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    language: { type: String, default: "en" },
    saveAsTemplate: { type: Boolean, default: false },


    analytics: {
      formViews: { type: Number, default: 0 },
      submissions: { type: Number, default: 0 },
      submissionRate: { type: Number, default: 0 },
    },

    // Tags (Reference to Tags Schema)
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }], 


    // Design Options
    design: {
      theme: { type: String, default: "default" },
      primaryColor: { type: String, default: "#007bff" },
      colorMode: { type: String, enum: ["light", "dark", "auto"], default: "light" },
      fontStyle: { type: String, default: "default" },
      uppercaseLabels: { type: Boolean, default: false },
      backgroundImage: { type: String },
      backgroundColor: { type: String },
      borderRadius: { type: String, enum: ["none", "small", "medium", "large"], default: "none" },
      borderWidth: { type: Number, default: 0 },
      borderColor: { type: String },
      borderStyle: { type: String, enum: ["solid", "dashed", "dotted"], default: "solid" },
      borderOpacity: { type: Number, default: 1 },

    },

    // Layout & Sizing
    layout: {
      inputSize: { type: String, enum: ["small", "medium", "large"], default: "medium" },
      inputRoundness: { type: String, enum: ["small", "medium", "large"], default: "medium" },
      width: { type: String, enum: ["full-width", "centered"], default: "centered" },
      rtl: { type: Boolean, default: false },
    },



    // Branding & Media
    branding: {
      logo: { type: String },
      colorImage: { type: String },
      removeBranding: { type: Boolean, default: false },
    },



    // Advanced Options
    advanced: {
      hideFormTitle: { type: Boolean, default: false },
      showProgressBar: { type: Boolean, default: false },
      transparentBackground: { type: Boolean, default: false },
      confettiOnSuccess: { type: Boolean, default: false },
    },


    // Fields (References the Field Schema)
    fields: [{ type: Schema.Types.ObjectId, ref: "Field" }],


    // Metadata
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },


    // Form Settings (Security, Submission, Link)
    formSettings: {
      submission: {
        submitButtonText: { type: String, default: "Submit" },
        autoSave: { type: Boolean, default: false },
        databaseAction: { type: String, enum: ["create", "update"], default: "create" },
        updateProperties: [{ type: String }],
        afterSubmission: {
          action: { type: String, enum: ["successPage", "redirect"], default: "successPage" },
          redirectURL: { type: String },
          successTextHeading: { type: String, default: "Thank you!" },
          successTextDescription: { type: String, default: "Your response has been recorded." },
          reFillable: { type: Boolean, default: false },
          editableSubmission: { type: Boolean, default: false },
        },
      },
      
      security: {
        password: { type: String },
        closingDate: { type: Date },
        closedFormText: { type: String },
        submissionLimit: { type: Number },
        maxSubmissionsText: { type: String },
        botProtection: {
          enabled: { type: Boolean, default: false },
          provider: { type: String, enum: ["reCAPTCHA", "hCaptcha"], default: "reCAPTCHA" },
        },
      },
      link: {
        pageTitle: { type: String, default: "Form Page" },
        pageDescription: { type: String, default: "Submit your response." },
        thumbnail: { type: String },
        favicon: { type: String },
      },
    },
  },
  { timestamps: true } // Enables createdAt and updatedAt automatically
);

// **Export Model**
export const Form = mongoose.model<IForm>("Form", FormSchema);