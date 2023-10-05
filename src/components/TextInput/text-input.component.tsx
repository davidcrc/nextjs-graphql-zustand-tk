"use client";

import React, { useEffect } from "react";

type TextInputProps = {
  placeHolder: string;
  inputType: string;
  max: number;
  error: string;
  autoFocus: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const TextInput = ({
  placeHolder,
  inputType,
  max,
  error,
  autoFocus,
  onChange,
  value,
}: TextInputProps) => {
  useEffect(() => {
    if (autoFocus) {
      const input = document.getElementById(`input-${placeHolder}`);
      input?.focus();
    }
  }, [autoFocus, placeHolder]);

  return (
    <div>
      <input
        value={value}
        id={`input-${placeHolder}`}
        placeholder={placeHolder}
        type={inputType}
        autoComplete="off"
        maxLength={max}
        onChange={onChange}
        className="block w-full bg-[#F1F1F2] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none"
      />
      {error && (
        <span className="text-red-500 text-[14px] font-semibold">{error}</span>
      )}
    </div>
  );
};

export default TextInput;
