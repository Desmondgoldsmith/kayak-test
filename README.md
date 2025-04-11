## Kayak Test


## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Iconsax React](https://iconsax-react.pages.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)

## 📂 Project Structure

```
kayak-test/
├── public/
│   └── assets/
│       ├── avatar.png
│       └── notif.png
├── src/
│   ├── app/
│   │   ├── Features/
│   │   │   └── MainUI/
│   │   │       ├── molecules/
│   │   │       │   ├── datePickerField.jsx
│   │   │       │   ├── fileUploader.jsx
│   │   │       │   ├── formComponent.jsx
│   │   │       │   ├── navbar.jsx
│   │   │       │   ├── notification.jsx
│   │   │       │   └── tagsField.jsx
│   │   │       └── templates/
│   │   │           └── mainContentTemplate.jsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   │   └── ui/
│   │       ├── button.jsx
│   │       ├── calendar.jsx
│   │       ├── input.jsx
│   │       └── popover.jsx
│   └── lib/
│       ├── helpers/
│       │   ├── extractErrorMessages.js
│       │   ├── getFileType.js
│       │   └── idGenerator.js
│       └── utils.js
├── components.json
├── jsconfig.json 
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── README.md
```



## 🧠 Architecture & How It Works

### Atomic Design Pattern

This project follows the **Atomic Design** methodology, a design system that breaks interfaces down into fundamental building blocks and then combines them to create complex components and templates. The pattern consists of five distinct levels:

1. **Atoms**: Basic UI elements (buttons, inputs, labels)
2. **Molecules**: Simple groups of UI elements functioning together
3. **Organisms**: Complex UI components composed of molecules and atoms
4. **Templates**: Page-level objects that place components into a layout
5. **Pages**: Specific instances of templates with real content

In our project structure:

#### Atoms
Basic UI elements primarily from shadcn/ui components:
- `/components/ui/button.jsx`
- `/components/ui/input.jsx`
- `/components/ui/calendar.jsx`
- `/components/ui/popover.jsx`

#### Molecules
Functional groups of atoms that work together to provide specific functionality:
- `datePickerField.jsx`: Combines calendar, popover, and button components
- `fileUploader.jsx`: Groups input, labels, and icons for file handling
- `formComponent.jsx`: Coordinates multiple input components
- `navbar.jsx`: Combines navigation elements and user profile controls
- `notification.jsx`: Assembles status icons with message display
- `tagsField.jsx`: Combines input with formatting logic for tags

#### Templates
Page-level structures that arrange molecules into functional layouts:
- `mainContentTemplate.jsx`: Orchestrates the entire file upload interface, including form handling, API communication, and user feedback

The Atomic Design pattern brings several benefits to this project:
1. **Reusability**: Components are built to be reused across the application
2. **Consistency**: UI elements maintain consistent appearance and behavior
3. **Scalability**: New features can be built from existing components
4. **Maintainability**: Components are isolated, making them easier to test and update



### Core Application Flow

1. **User Interface Layer** (`MainUI/templates/mainContentTemplate.jsx`)
   - Serves as the main entry point for the file upload feature
   - Manages application state (loading, notifications)
   - Handles form submission and API integration

2. **Component Layer** (`MainUI/molecules/`)
   - Contains reusable UI components with specific functionality
   - Each component is focused on a single responsibility

3. **Helper Layer** (`lib/helpers/`)
   - Provides utility functions for common operations
   - Abstracts complex logic away from components

### Component Breakdown

#### MainContentTemplate
The orchestrator that brings all components together:
- Initializes the form state
- Handles API communication for file uploads
- Manages notification displays
- Uses the `FormComponent` to collect user input

#### FormComponent
The central form that:
- Manages form data state
- Validates input before submission
- Coordinates all form-related components
- Handles file selection through `FileUploader`
- Collects date inputs through `DatePickerField`
- Gathers tag information through `TagsField`

#### FileUploader
Specialized component for file selection:
- Provides drag-and-drop functionality
- Shows file preview after selection
- Formats file size for display
- Allows file removal and replacement

#### DatePickerField
Date selection component that:
- Uses shadcn/ui's Calendar component
- Formats dates using date-fns
- Provides consistent date handling

#### TagsField
Tag input component that:
- Converts comma-separated text into tag arrays
- Provides input validation
- Includes informational tooltips

#### Navbar
Navigation component that:
- Shows breadcrumb navigation
- Displays user profile
- Provides notification access

#### Notification
Toast notification system that:
- Displays success/error messages
- Auto-dismisses after 5 seconds
- Provides visual feedback on actions

### Helper Functions Explained

#### idGenerator.js
Provides unique ID generation for forms:
- `generateId()`: Creates incremental IDs for form instances
- `resetIdCounter()`: Resets the counter when needed

Usage:
```javascript
import { generateId, resetIdCounter } from '@/lib/helpers/idGenerator';

// In component initialization
const formData = { id: generateId(), ... };

// When resetting the application state
useEffect(() => {
  resetIdCounter();
}, []);
```

#### getFileType.js
Determines appropriate file type categorization:
- Maps MIME types to user-friendly categories
- Handles special cases for documents, images, etc.
- Falls back to extension-based typing when needed

Usage:
```javascript
import { getFileType } from '@/lib/helpers/getFileType';

// When a file is selected
const handleFileChange = (file) => {
  setFormData((prev) => ({
    ...prev,
    file,
    fileType: getFileType(file)
  }));
};
```

#### extractErrorMessages.js
Parses API error responses for consistent error handling:
- Handles multiple error formats (DRF, JSON:API, etc.)
- Extracts meaningful messages from nested error objects
- Provides fallbacks for unexpected error formats

Usage:
```javascript
import { extractErrorMessage } from '@/lib/helpers/extractErrorMessages';

// In API response handling
try {
  const response = await fetchAPI();
  // Success handling
} catch (error) {
  const errorMessage = extractErrorMessage(error);
  showNotification(errorMessage, "error");
}
```

### Data Flow

1. **Form Data Collection**:
   - User interacts with form inputs (file upload, name, dates, tags)
   - Form component maintains state via React's useState
   - Validation ensures required fields are completed

2. **Form Submission**:
   - User clicks "Save" button
   - Form data is collected and formatted
   - API request is prepared with FormData object

3. **API Communication**:
   - FormData is sent to the backend API
   - Loading state is managed during request
   - Response is processed (success or error)

4. **User Feedback**:
   - Notification system shows appropriate message
   - Form is reset on success
   - Error details are shown on failure

## 🚦 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Desmondgoldsmith/kayak-test.git
cd kayak-test
```

2. Install dependencies
```bash
npm install
# or with the peer dependency fix
npm install --legacy-peer-deps
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

## ⚙️ Deployment to Vercel
https://kayak-test-cdgg.vercel.app/
