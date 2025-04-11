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
