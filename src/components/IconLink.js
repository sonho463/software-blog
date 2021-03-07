import React from 'react';
import 'twin.macro';

export const IconLink = ({ href, label, icon }) => {
  const linkParams = { href };

  if (href.startsWith('http')) {
    linkParams.target = '_blank';
    linkParams.rel = 'noreferrer noopener';
  }

  return (
    <li tw="inline-block px-2">
      <a
        {...linkParams}
        tw="inline-flex h-8 w-8 border border-blue-800 text-blue-800 rounded-full items-center justify-center transition-colors duration-200 hover:text-white hover:bg-blue-400 hover:border-blue-400"
      >
        <span tw="sr-only">{label}</span>
        {icon}
      </a>
    </li>
  );
};
