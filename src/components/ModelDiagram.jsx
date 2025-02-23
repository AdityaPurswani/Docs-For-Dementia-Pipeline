import React, { useState } from 'react';

const ArchitectureBox = ({ title, children, type = 'default' }) => {
  const baseStyles = "rounded-lg border transition-all duration-300";
  const styles = {
    default: "border-gray-300 p-2",
    model: "border-yellow-200 p-4 bg-yellow-50",
    classifier: "border-red-100 p-4 bg-red-50",
    transformer: "border-blue-200 p-4 bg-blue-50"
  };

  return (
    <div className={`${baseStyles} ${styles[type]}`}>
      {title && (
        <div className="text-xs font-medium text-gray-500 mb-2">{title}</div>
      )}
      {children}
    </div>
  );
};

const Block = ({ title }) => (
  <div className="w-12 h-12 border border-green-900 rounded-lg bg-green-50"></div>
);

const Arrow = () => (
  <div className="flex items-center mx-2">
    <div className="w-4 h-0.5 bg-gray-400"></div>
    <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-400"></div>
  </div>
);

const ModelDiagram = () => {
  return (
    <div className="p-4">
      <ArchitectureBox type="model">
        <ArchitectureBox type="classifier">
          <div className="flex items-center">
            {/* Input */}
            <div className="text-sm">Input</div>
            <Arrow />

            {/* Pretrained Base Model */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-400 rounded"></div>
              </div>
              <div className="text-xs mt-1">Pretrained Base Model</div>
            </div>
            <Arrow />

            {/* Linear Layer */}
            <div className="text-xs">
              Linear (768 layers → 256 layers)
            </div>
            <Arrow />

            {/* LayerNorm */}
            <div className="text-xs">
              LayerNorm (256 layers)
            </div>
            <Arrow />

            {/* First RiskTransformerBlock */}
            <ArchitectureBox type="transformer" title="RISKTRANSFORMERBLOCK">
              <div className="grid grid-cols-2 gap-2">
                <Block />
                <Block />
                <Block />
                <Block />
              </div>
            </ArchitectureBox>
            <Arrow />

            {/* Second RiskTransformerBlock */}
            <ArchitectureBox type="transformer" title="RISKTRANSFORMERBLOCK">
              <div className="mb-2 text-green-900">d_model: 256 <br/> num_heads: 4</div>
              <div className="text-green-900">d_ff: 512 <br/> dropout: 0.2</div>
            </ArchitectureBox>
            <Arrow />

            {/* Linear Layer */}
            <div className="text-xs">
              Linear (256 layers → 64 layers)
            </div>
            <Arrow />

            {/* GELU */}
            <div className="text-xs">GELU</div>
            <Arrow />

            {/* LayerNorm */}
            <div className="text-xs">
              LayerNorm (64 layers)
            </div>
            <Arrow />

            {/* Dropout */}
            <div className="text-xs">
              Dropout (0.2)
            </div>
            <Arrow />

            {/* Linear Layer */}
            <div className="text-xs">
              Linear (64 layers → 1 layer)
            </div>
            <Arrow />

            {/* Sigmoid */}
            <div className="text-xs">Sigmoid</div>
            <Arrow />

            {/* Output */}
            <div className="text-sm">Output</div>
          </div>
        </ArchitectureBox>
      </ArchitectureBox>
    </div>
  );
};

export default ModelDiagram;