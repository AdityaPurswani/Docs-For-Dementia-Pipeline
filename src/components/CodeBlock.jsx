// src/components/CodeBlock.jsx
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ children, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-[#1E1E1E] border-b border-[#323232]">
        <span className="text-xs text-[#808080]">{language}</span>
        <button 
          onClick={handleCopy}
          className="text-[#808080] hover:text-white transition-colors p-1 rounded hover:bg-[#323232]"
        >
          {copied ? (
            <Check size={16} className="text-[#73C991]" />
          ) : (
            <Copy size={16} />
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={true}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: '#1E1E1E',
          padding: '1rem'
        }}
        lineNumberStyle={{
          minWidth: '2.5em',
          paddingRight: '1em',
          color: '#858585',
          textAlign: 'right',
          userSelect: 'none'
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;