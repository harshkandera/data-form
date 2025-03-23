# Form Builder

## Introduction
The **Form Builder** is a web-based tool that allows users to create, customize, and manage forms with a drag-and-drop interface. It supports various form elements such as text fields, dropdowns, checkboxes, and more, making form creation intuitive and flexible.

## Features
- 🏗 **Drag-and-drop form builder**
- ✏ **Editable text fields, checkboxes, dropdowns, and radio buttons**
- 🎨 **Customizable field properties** (labels, placeholders, required fields, etc.)
- 📌 **Real-time preview of forms**
- 📤 **Save and export form configurations**
- 📄 **Multi-page form support**
- 🔄 **Undo/Redo functionality**
- 🛠 **Easy integration with APIs and databases**

## Technologies Used
- **Frontend:** React, TypeScript, Tailwind CSS
- **State Management:** Zustand
- **Icons & UI Components:** React Icons, Custom UI Components
- **Backend (optional):** Node.js, Express, MongoDB (for saving form data)

## Installation
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14+ recommended)
- npm or yarn package manager

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/harshkandera/data-form.git
   cd form-builder
   ```
2. Install dependencies:
   ```bash
   npm install
   # OR
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # OR
   yarn dev
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage Guide
### Adding Form Elements
- Click on a field type (e.g., **Text**, **Dropdown**, **Checkbox**) from the sidebar.
- Drag and drop it into the form canvas.
- Click on a field to open its properties panel and customize it.

### Editing Field Properties
- Change the **label**, **placeholder**, **required** status, etc.
- Adjust layout settings (e.g., full-width or half-width fields).

### Saving and Exporting Forms
- Forms can be saved in JSON format.
- Export the form structure for backend processing.

## Project Structure
```
form-builder/
├── src/
│   ├── components/       # Reusable UI components
│   ├── store/            # Zustand state management
│   ├── pages/            # Page views
│   ├── hooks/            # Custom hooks
│   ├── styles/           # Global styles
│   └── utils/            # Helper functions
├── public/               # Static assets
├── package.json          # Project dependencies
└── README.md             # Documentation
```

## Deployment
### Deploying to Vercel
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run the deployment command:
   ```bash
   vercel
   ```
3. Follow the setup instructions in the terminal.

### Deploying with Docker
1. Build the Docker image:
   ```bash
   docker build -t form-builder .
   ```
2. Run the container:
   ```bash
   docker run -p 3000:3000 form-builder
   ```

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them.
4. Push the changes: `git push origin feature-name`
5. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For any issues or feature requests, feel free to reach out via GitHub Issues or contact `your.email@example.com`.

Happy Coding! 🚀
