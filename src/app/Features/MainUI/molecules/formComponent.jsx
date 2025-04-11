import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DatePickerField from './datePickerField';
import TagsField from './tagsField';
import { generateId } from '@/lib/helpers/idGenerator';
import { getFileType } from '@/lib/helpers/getFileType';
import FileUploader from './fileUploader';

const FormComponent = ({ onSubmit, loading }) => {
  const [fileUploadKey, setFileUploadKey] = useState(0);
  
  const [formData, setFormData] = useState({
    id: generateId(),
    fileName: "",
    originalFileName: "",
    fileType: "",
    tagNames: [""],
    file: null,
    reminder: "",
    expireAt: ""
  });
  
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Check if required fields are filled
  useEffect(() => {
    const valid = formData.fileName.trim() !== "" && formData.file !== null;
    setIsFormValid(valid);
  }, [formData]);

  const extractOriginalFileName = (fullFileName) => {
    if (!fullFileName) return "";
    return fullFileName.split('.')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagsChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (file) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file,
        originalFileName: extractOriginalFileName(file.name),
        fileType: getFileType(file) 
      }));
    } else {
      // Handle file removal
      setFormData((prev) => ({
        ...prev,
        file: null,
        originalFileName: "",
        fileType: ""
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dataToSubmit = {
      ...formData,
      id: formData.id,
      fileType: formData.fileType || ""
    };
    
    console.log(dataToSubmit)
    onSubmit(dataToSubmit);
    
    // Reset form and set new id after submission
    setFormData({
      id: generateId(),
      fileName: "",
      originalFileName: "",
      fileType: "",
      tagNames: [""],
      file: null,
      reminder: "",
      expireAt: ""
    });
    
    // remount the FileUploader component to reset UI
    setFileUploadKey(prev => prev + 1);
  };

  const handleCancel = () => {
    setFormData({
      id: generateId(),
      fileName: "",
      originalFileName: "",
      fileType: "",
      tagNames: [""],
      file: null,
      reminder: "",
      expireAt: ""
    });
    
    // remount the FileUploader component to reset UI
    setFileUploadKey(prev => prev + 1);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-md">
      <div className="p-3">
        <FileUploader 
          key={fileUploadKey} 
          onFileChange={handleFileChange} 
        />
        
        <div className="flex flex-col space-y-1 mt-4">
          <label className="text-[#3D3D3D]">File Name <span className="text-red-600">*</span></label>
          <Input
            name="fileName"
            type="text"
            onChange={handleChange}
            value={formData.fileName}
            placeholder="Ex: May23 invoice"
            required
            className="w-full rounded-md border-gray-300 h-10"
          />
        </div>
        
        <DatePickerField 
          label="Expiration Date" 
          value={formData.expireAt} 
          onChange={handleDateChange}
          name="expireAt"
          placeholder="E.g 20/01/2025"
        />
        
        <DatePickerField 
          label="Reminder" 
          value={formData.reminder} 
          onChange={handleDateChange}
          name="reminder"
          placeholder="E.g 20/01/2025"
        />
        
        <TagsField 
          value={formData.tagNames} 
          onChange={handleTagsChange} 
        />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button 
            type="button" 
            className="border border-[#102340] py-2 px-4 bg-white rounded-md text-[#102340] h-10"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className={`border border-[#102340] py-2 px-4 text-white rounded-md bg-[#102340] h-10 ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}
            disabled={loading || !isFormValid}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormComponent;