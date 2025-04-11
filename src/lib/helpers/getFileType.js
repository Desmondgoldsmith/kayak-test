/**
 * Determines the appropriate fileType value based on the provided file object
 * @param {File|null} file -  file object from input / nulll if no file selected
 * @returns {string}  file type string to use in the form data
 */
export const getFileType = (file) => {
    // Return empty string if no file provided
    if (!file) return "";
    
    // Check if it's an image file
    if (file.type.startsWith('image/')) {
        // Return the actual MIME type (image/jpeg, image/png, etc)
      return file.type; 
    }
    
    // For PDF files
    if (file.type === 'application/pdf') {
      return 'application/pdf';
    }
    
    // For common document types
    const documentTypes = {
      'application/msword': 'document/word',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'document/word',
      'application/vnd.ms-excel': 'document/excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'document/excel',
      'application/vnd.ms-powerpoint': 'document/powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'document/powerpoint',
      'text/plain': 'document/text'
    };
    
    if (documentTypes[file.type]) {
      return documentTypes[file.type];
    }
    
    // For other file types, use a generic "file" type with the extension if available
    const extension = file.name.split('.').pop().toLowerCase();
    if (extension) {
      return `file/${extension}`;
    }
    
    // Default fallback
    return "image/jpeg";
  };