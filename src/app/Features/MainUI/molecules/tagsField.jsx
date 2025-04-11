import React from 'react';
import { Input } from '@/components/ui/input';
import { InfoCircle } from 'iconsax-react';

const TagsField = ({ value, onChange }) => {
  const handleChange = (e) => {
    const tagInput = e.target.value;
    onChange("tagNames", tagInput.split(',').map(tag => tag.trim()).filter(tag => tag !== ""));
  };

  return (
    <div className="flex flex-col space-y-1 mt-4">
      <label className="text-[#3D3D3D]">Tag <span className="text-red-600">*</span></label>
      <Input
        name="tagNames"
        type="text"
        onChange={handleChange}
        value={Array.isArray(value) ? value.join(', ') : value}
        placeholder="Add keywords to your resources"
        className="w-full rounded-md border-gray-300 h-10"
      />
      <div className="flex flex-row items-center space-x-1 mt-1">
        <InfoCircle size="14" color="#292D32"  variant="Bold"/>
        <p className="text-xs text-gray-400">Keyword for ease of search</p>
      </div>
    </div>
  );
};

export default TagsField;