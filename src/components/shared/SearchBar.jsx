import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Navigation data for search
  const searchableContent = [
    {
      section: 'Getting Started',
      items: [
        { title: 'Installation', href: '/installation', description: 'Setup and installation guide' },
        { title: 'Quick Start', href: '/quick-start', description: 'Get started quickly with basic concepts' }
      ]
    },
    {
      section: 'MRI Analysis',
      items: [
        { title: 'Loading Images', href: '/mri/loading', description: 'Load and prepare MRI images' },
        { title: 'Preprocessing', href: '/mri/preprocessing', description: 'Preprocess MRI data' },
        { title: 'Segmentation', href: '/mri/segmentation', description: 'Image segmentation techniques' },
        { title: 'Visualization', href: '/mri/visualization', description: 'Visualize MRI data' },
        { title: 'Feature Extraction', href: '/risk/feature', description: 'Extract features from MRI' }
      ]
    },
    {
      section: 'Risk Analysis',
      items: [
        { title: 'Text Processing', href: '/risk/text-processing', description: 'Process medical text data' },
        { title: 'Severity Analysis', href: '/risk/severity', description: 'Analyze medical severity' },
        { title: 'Model Architecture', href: '/risk/architecture', description: 'Neural network architecture' },
        { title: 'Training Process', href: '/risk/training', description: 'Model training details' },
        { title: 'Inference', href: '/risk/inference', description: 'Model inference and explanation' }
      ]
    },
    {
      section: 'Advances Topics',
      items: [
        { title: 'Batch Processing', href: '/advanced/batch', description: 'Batch processing multiple data' },
        { title: 'Advanced Data Imputation', href: '/advanced/imputation', description: 'Explore Class Aware data imputation strategy implied here' },
        { title: 'Custom Models', href: '/advanced/models', description: 'Custom and advanced training models' }
      ]
    }
  ];

  // Filter results based on search query
  const filteredResults = searchQuery.length > 0
    ? searchableContent.map(section => ({
        section: section.section,
        items: section.items.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.items.length > 0)
    : [];

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-lg" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Quick search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Search Results Dropdown */}
      {showResults && searchQuery.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          {filteredResults.length > 0 ? (
            filteredResults.map((section, sectionIndex) => (
              <div key={sectionIndex} className="py-2">
                <div className="px-4 py-2 text-sm font-semibold text-gray-500">
                  {section.section}
                </div>
                {section.items.map((item, itemIndex) => (
                  <a
                    key={itemIndex}
                    href={item.href}
                    className="block px-4 py-2 hover:bg-gray-50"
                    onClick={() => setShowResults(false)}
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.description}
                    </div>
                  </a>
                ))}
              </div>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-gray-500">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
