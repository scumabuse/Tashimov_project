'use client';

import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea(props: TextareaProps) {
  return (
    <textarea
      {...props}
      className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm"
    />
  );
}