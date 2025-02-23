import React, { useState, useEffect } from 'react';
import { Copy, Check, Edit2, RotateCcw } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ children, language }) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [code, setCode] = useState(children);
  const [originalCode] = useState(children); // Store original code

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(originalCode);
    setIsEditing(false);
  };

  // Toggle between edit and view modes
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Update code when children prop changes
  useEffect(() => {
    setCode(children);
  }, [children]);

  return (
    <div className="relative rounded-lg overflow-hidden border border-[#323232]">
      <div className="flex justify-between items-center px-4 py-2 bg-[#1E1E1E] border-b border-[#323232]">
        <span className="text-xs text-[#808080]">{language}</span>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="text-[#808080] hover:text-white transition-colors p-1 rounded hover:bg-[#323232]"
            title="Reset to original"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={toggleEdit}
            className={`text-[#808080] hover:text-white transition-colors p-1 rounded hover:bg-[#323232] ${
              isEditing ? 'text-[#73C991]' : ''
            }`}
            title="Toggle edit mode"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={handleCopy}
            className="text-[#808080] hover:text-white transition-colors p-1 rounded hover:bg-[#323232]"
            title="Copy code"
          >
            {copied ? (
              <Check size={16} className="text-[#73C991]" />
            ) : (
              <Copy size={16} />
            )}
          </button>
        </div>
      </div>
      
      {isEditing ? (
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full min-h-[200px] p-4 font-mono text-sm bg-[#1E1E1E] text-white focus:outline-none"
          spellCheck="false"
          style={{
            lineHeight: '1.5',
            resize: 'vertical'
          }}
        />
      ) : (
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
          {code}
        </SyntaxHighlighter>
      )}
    </div>
  );
};

export default CodeBlock;