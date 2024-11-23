import React from 'react';

export const Input = ({ label }: { label: string }) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input type="text" placeholder="Текст" className="input input-bordered w-full max-w-xs" />
    </label>
  );
};
