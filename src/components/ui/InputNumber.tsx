import React from 'react';

export const InputNumber = ({ label, labelBottomLeft }: { label: string; labelBottomLeft?: string }) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input type="number" min={0} max={1000} placeholder="Число" className="input input-bordered w-full max-w-xs" />
      <div className="label">{labelBottomLeft && <span className="label-text-alt">{labelBottomLeft}</span>}</div>
    </label>
  );
};
