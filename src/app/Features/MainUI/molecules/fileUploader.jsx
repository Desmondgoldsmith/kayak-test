import React, { useState, useEffect } from 'react';
import { GalleryAdd, CloseCircle, DocumentText } from 'iconsax-react';

const FileUploader = ({ onFileChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  
  useEffect(() => {
    setSelectedFile(null);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      onFileChange(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    // Notify parent component that file has been removed
    onFileChange(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div>
      <p className="text-[#3D3D3D] mb-1">Attachment <span className="text-red-600">*</span></p>
      
      {!selectedFile ? (
        <div className="border border-gray-300 border-dashed rounded-md mt-1 p-6 flex justify-center items-center">
          <label className="flex justify-center items-center flex-col space-y-2 cursor-pointer w-full">
            <GalleryAdd size="24" color="#757575" variant="Bold"/>
            <p className="text-sm">Drag and drop or <span className="text-blue-950 font-semibold">select</span></p>
            <p className="text-xs text-gray-400">Supported formats: .png, .jpg, .jpeg, apple format.</p>
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="hidden" 
              accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
            />
          </label>
        </div>
      ) : (
        <div className="border border-gray-300 rounded-md mt-1 p-3">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-50 p-2 rounded-md">
              <DocumentText size="20" color="#102340" variant="Bold"/>
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <label className="text-xs text-blue-950 font-medium cursor-pointer">
              Change file
              <input 
                type="file" 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
              />
            </label>
            
            <button 
              type="button"
              onClick={handleRemoveFile}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;