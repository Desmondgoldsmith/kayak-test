 
 // Helper function to extract error message from API response

  export const extractErrorMessage = (errorData) => {
    console.log("Error data:", errorData);
    
    // Check for token validation errors
    if (errorData.code === "token_not_valid") {
      if (errorData.messages && errorData.messages.length > 0) {
        return errorData.messages[0].message || errorData.detail;
      }
      return errorData.detail || "Authentication error";
    }
    
    // Check for standard error detail
    if (errorData.detail) {
      return errorData.detail;
    }
    
    // Check for error message field
    if (errorData.message) {
      return errorData.message;
    }
    
    // Check for common validation errors 
    if (errorData.non_field_errors && Array.isArray(errorData.non_field_errors)) {
      return errorData.non_field_errors.join(", ");
    }
    
    // Check for field-specific errors
    if (typeof errorData === 'object' && errorData !== null) {
      // Standard approach for field errors
      for (const key in errorData) {
        if (Array.isArray(errorData[key]) && errorData[key].length > 0) {
          return `${key}: ${errorData[key][0]}`;
        } else if (typeof errorData[key] === 'string') {
          return `${key}: ${errorData[key]}`;
        } else if (typeof errorData[key] === 'object' && errorData[key] !== null) {
          // Handle nested error objects
          for (const nestedKey in errorData[key]) {
            if (Array.isArray(errorData[key][nestedKey]) && errorData[key][nestedKey].length > 0) {
              return `${key}.${nestedKey}: ${errorData[key][nestedKey][0]}`;
            }
          }
        }
      }
    }
    
    // Handle case where errorData is an array
    if (Array.isArray(errorData) && errorData.length > 0) {
      if (typeof errorData[0] === 'string') {
        return errorData[0];
      } else if (typeof errorData[0] === 'object' && errorData[0] !== null) {
        // Try to extract message from first object
        const firstError = errorData[0];
        if (firstError.message) return firstError.message;
        if (firstError.detail) return firstError.detail;
      }
    }
    
    // Convert entire error object to string as last resort
    if (typeof errorData === 'object' && errorData !== null) {
      try {
        return JSON.stringify(errorData);
      } catch (e) {
        // If JSON serialization fails
        return "An error occurred with the request";
      }
    }
    
    // Fallback for unexpected error formats
    return "An unknown error occurred";
  };