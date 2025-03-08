import React from 'react';

const Sidebar = () => {
  const navigation = [
    {
      title: 'Getting Started',
      items: [
        { name: 'Installation', href: '/installation' },
        { name: 'Quick Start', href: '/quick-start' },
      ]
    },
    {
      title: 'MRI Analysis',
      items: [
        { name: 'Loading Images', href: '/mri/loading' },
        { name: 'Preprocessing', href: '/mri/preprocessing' },
        { name: 'Segmentation', href: '/mri/segmentation' },
        { name: 'Visualization', href: '/mri/visualization' },
        { name: 'Feature Extraction', href: '/mri/feature'}
      ]
    },
    {
      title: 'Risk Analysis',
      items: [
        { name: 'Text Processing', href: '/risk/text-processing' },
        { name: 'Severity Analysis', href: '/risk/severity' },
        { name: 'Model Architecture', href: '/risk/architecture' },
        { name: 'Training Process', href: '/risk/training' },
        { name: 'Inference and Explainability', href: '/risk/inference'}
      ]
    },
    {
      title: 'Advanced Topics',
      items: [
        { name: 'Batch Processing', href: '/advanced/batch' },
        { name: 'Advanced Data Imputation', href: '/advanced/imputation' },
        { name: 'Custom Models', href: '/advanced/models' }
      ]
    }
  ];

  return (
    <aside className="fixed w-80 h-screen border-r border-gray-200">
      <div className="h-full overflow-y-auto pt-8 px-4 text-center">
        <nav>
          {navigation.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h5 className="text-sm font-semibold text-gray-900 mb-4">
                {section.title}
              </h5>
              <ul className="space-y-2">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a
                      href={item.href}
                      className={`${
                        window.location.pathname === item.href
                          ? 'text-blue-800 font-medium'
                          : 'text-blue-600 hover:text-blue-800'
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;