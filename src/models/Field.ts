const mongoose = require("mongoose");

// Base Field Schema (parent)
const BaseFieldSchema = new mongoose.Schema({
    label: { type: String, required: true },
    required: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    
    type: { type: String, required: true }, // Discriminator key

    page: { type: Number, required: true, default: 1 },
    position: { type: Number , required: true },


    isLayoutBlock: { type: Boolean, default: false },
    blockProperties: {
        blockName: { type: String },
    },

    
    options: {
        helpText: { type: String },
        helpTextPosition: { type: String, enum: ['above', 'below'], default: 'above' },
        fieldWidth: { type: String, enum: ['full', 'half', 'one-third', 'two-thirds'], default: 'full' },
        placeholder: { type: String }
    },
    

}, { discriminatorKey: 'type', timestamps: true });




// Create the base model 
const Field = mongoose.model('Field', BaseFieldSchema);

// Text Block (layout block)
const TextBlock = Field.discriminator('textblock', new mongoose.Schema({
    'blockProperties.content': { type: String, required: true },
    'blockProperties.alignment': { type: String, enum: ['left', 'center', 'right'], default: 'left' },
  }));
  
  // Page Break (layout block)
  // Changed next/previous button labels to String
  const PageBreak = Field.discriminator('pagebreak', new mongoose.Schema({
    'blockProperties.nextButtonLabel': { type: String },
    'blockProperties.previousButtonLabel': { type: String },
  }));
  
  // Divider Block (layout block)
  const DividerBlock = Field.discriminator('divider', new mongoose.Schema({
    'blockProperties.alignment': { type: String, enum: ['left', 'center', 'right'], default: 'left' },
    'blockProperties.color': { type: String },
    'blockProperties.thickness': { type: Number },
  }));
  
  // Image Block (layout block)
  const ImageBlock = Field.discriminator('image', new mongoose.Schema({
    'blockProperties.image': { type: String, required: true },
    'blockProperties.alignment': { type: String, enum: ['left', 'center', 'right'], default: 'left' },
    'blockProperties.caption': { type: String },
    'blockProperties.captionPosition': { type: String, enum: ['above', 'below'], default: 'above' },
  }));
  



// Text Field discriminator
const TextField = Field.discriminator('text', new mongoose.Schema({
    'options.multiline': { type: Boolean, default: false },
    'options.secret': { type: Boolean, default: false },
    'options.maxLength': { type: Number },
    'options.minLength': { type: Number },
    'options.showCharacterCount': { type: Boolean, default: false },
    'options.prefilledValue': { type: String }
}));

// Rich Text Field
const RichTextField = Field.discriminator('richtext', new mongoose.Schema({
    'options.maxLength': { type: Number },
    'options.minLength': { type: Number },
    'options.showCharacterCount': { type: Boolean, default: false },
    'options.prefilledValue': { type: String }
}));

// Date Field
const DateField = Field.discriminator('date', new mongoose.Schema({
    'options.dateFormat': { type: String, enum: ['dd/mm/yyyy', 'mm-dd-yyyy'], default: 'dd/mm/yyyy' },
    'options.includeTime': { type: Boolean, default: false },
    'options.timeZone': { type: String, enum: ['local', 'utc'], default: 'local' },
    'options.timeFormat': { type: String, enum: ['12', '24'], default: '12' },
    'options.minDate': { type: Date },
    'options.maxDate': { type: Date },
    'options.dateOptions': {
        includeEndDate: { type: Boolean, default: false },
        prefillWithToday: { type: Boolean, default: false },
        disablePastDates: { type: Boolean, default: false },
        disableFutureDates: { type: Boolean, default: false }
    },
    'options.prefilledValue': { type: Date }
}));

// URL Field
const UrlField = Field.discriminator('url', new mongoose.Schema({
    'options.maxLength': { type: Number },
    'options.minLength': { type: Number },
    'options.showCharacterCount': { type: Boolean, default: false },
    'options.prefilledValue': { type: String }
}));

// Phone Field
const PhoneField = Field.discriminator('phone', new mongoose.Schema({
    'options.prefilledCountryCode': { type: String, default: '+1' },
    'options.prefilledValue': { type: String },
    'options.disabledCountryCode': { type: [String] }
}));

// Email Field
const EmailField = Field.discriminator('email', new mongoose.Schema({
    'options.characterLimit': { type: Boolean, default: false },
    'options.maxLength': { type: Number },
    'options.minLength': { type: Number },
    'options.showCharacterCount': { type: Boolean, default: false },
    'options.prefilledValue': { type: String }
}));

// Checkbox Field
const CheckboxField = Field.discriminator('checkbox', new mongoose.Schema({
    'options.prefilledValue': { type: Boolean, default: false },
    'options.useToggleSwitch': { type: Boolean, default: false }
}));

// Select Field
const SelectField = Field.discriminator('select', new mongoose.Schema({
    'options.options': [{ type: String }],
    'options.allowOtherCreateNewOption': { type: Boolean, default: false },
    'options.showAllSelectOptions': { type: Boolean, default: false },
    'options.prefilledValue': { type: String }
}));

// Multi-Select Field
const MultiSelectField = Field.discriminator('multi-select', new mongoose.Schema({
    'options.options': [{ type: String }],
    'options.allowOtherCreateNewOption': { type: Boolean, default: false },
    'options.showAllSelectOptions': { type: Boolean, default: false },
    'options.prefilledValue': { type: [String] }
}));

// Number Field
const NumberField = Field.discriminator('number', new mongoose.Schema({
    'options.minValue': { type: Number },
    'options.maxValue': { type: Number },
    'options.showCharacterCount': { type: Boolean, default: false },
    'options.prefilledValue': { type: Number }
}));

// Rating Field
const RatingField = Field.discriminator('rating', new mongoose.Schema({
    'options.minValue': { type: Number },
    'options.maxValue': { type: Number },
    'options.prefilledValue': { type: Number }
}));

// Scale Field
const ScaleField = Field.discriminator('scale', new mongoose.Schema({
    'options.minValue': { type: Number },
    'options.maxValue': { type: Number },
    'options.scaleStepsValue': { type: Number },
    'options.prefilledValue': { type: Number }
}));

// File Field
const FileField = Field.discriminator('file', new mongoose.Schema({
    'options.allowedFileTypes': { type: [String] },
    'options.maxFileSize': { type: Number, default: 10 },
    'options.allowMultipleFiles': { type: Boolean, default: false },
    'options.allowCameraUpload': { type: Boolean, default: false },
    'options.prefilledValue': { type: [String] }
}));

// Signature Field
const SignatureField = Field.discriminator('signature', new mongoose.Schema({
    'options.prefilledValue': { type: String }
}));

module.exports = {
    Field,
    TextField,
    RichTextField,
    DateField,
    UrlField,
    PhoneField,
    EmailField,
    CheckboxField,
    SelectField, 
    MultiSelectField,
    NumberField,
    RatingField,
    ScaleField,
    FileField,
    SignatureField,
    TextBlock,
    PageBreak,
    DividerBlock,
    ImageBlock
};




