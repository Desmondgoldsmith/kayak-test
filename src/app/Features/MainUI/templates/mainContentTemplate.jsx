"use client"

import React, { useState } from 'react';
import { FolderAdd } from 'iconsax-react';
import { resetIdCounter } from '@/lib/helpers/idGenerator';
import Notification from '../molecules/notification';
import { extractErrorMessage } from '@/lib/helpers/extractErrorMessages';
import FormComponent from '../molecules/formComponent';

const MainContentTemplate = () => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });
  
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0MzAxODkxLCJpYXQiOjE3NDQyMTU0OTEsImp0aSI6IjE4MjllZmRkNTg3NDQxNWNiODYzZDQ3ZTM1NzhhMTQ0IiwidXNlcl9pZCI6ImZkNTExY2ViLTU3ZTYtNDA3My05OTI5LTE3OTM4OWMzMGVhYyJ9.lPIvvmamB8qd9SzjoUmTYXvh3I3yfVT37553KMDnko0"
  
  const clearNotification = () => {
    setNotification({ show: false, message: "", type: "success" });
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
  };



  const handleFormSubmit = async (formData) => {
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }
      formDataToSend.append('fileName', formData.fileName);
      formDataToSend.append('tagNames', JSON.stringify(formData.tagNames));
      
      if (formData.expireAt) {
        formDataToSend.append('expireAt', formData.expireAt);
      }
      
      if (formData.reminder) {
        formDataToSend.append('reminder', formData.reminder);
      }
      
      const res = await fetch("https://api-testing.tuulbox.app/api/storage/upload/direct/start/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formDataToSend
      });

      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const textResponse = await res.text();
        try {
          data = JSON.parse(textResponse);
        } catch (e) {
          data = { detail: textResponse || res.statusText || `Error: ${res.status}` };
        }
      }

      if (res.ok) {
        showNotification("File uploaded successfully", "success");
      } else {
        const errorMessage = extractErrorMessage(data);
        showNotification(`Upload failed: ${errorMessage}`, "error");
        
        if (data.code === "token_not_valid") {
          console.error("Authentication token is invalid or expired.");
        }
      }
    } catch (error) {
      console.error(`Network or parsing error:`, error);
      showNotification(`Upload failed: ${error.message || "Network error"}`, "error");
    }
    
    setLoading(false);
  };

  // Reset id counter when component mounts 
  React.useEffect(() => {
    resetIdCounter();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-3 px-4 md:px-12">
      {notification.show && (
        <Notification 
          message={notification.message}
          type={notification.type}
          onClose={clearNotification}
        />
      )}
      
      <div className="p-2">
        <div className="flex flex-row space-x-2 text-sm text-[#7A7A7A]">
          <div>
            <FolderAdd size="20" color="#7A7A7A" />
          </div>
          <div className="flex flex-col space-y-1">
            <p className="font-medium">New File</p>
            <p>Fill in the correct details to add a new file</p>
          </div>
        </div>
      </div>
      
      <FormComponent 
        onSubmit={handleFormSubmit}
        loading={loading}
      />

      <div></div>
    </div>
  );
};

export default MainContentTemplate;