import React from "react";

const SelectMember = ({ options, onChange }) => {
  return (
    <div className="form-group">
      <label>Membership Type</label>
      <select options={options} onChange={onChange} className="form-control">
        {options.map(option => (
          <option key={option.key} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectMember;
