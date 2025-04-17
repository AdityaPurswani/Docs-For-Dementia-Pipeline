import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Github, Twitter } from 'lucide-react';
import SearchBar from '../shared/SearchBar';
import brain from './brain.webp'
import ContactForm from '../ContactForm';

const NavBar = ({ isOpen, setIsOpen }) => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto">
        <div className="py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  <img className='w-16 h-8 object-contain flex-row' src={brain}/>
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  Docs
                </span>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <SearchBar />
              </div>
              <div className="hidden md:flex items-center gap-4">
                <a href="/contact" className="text-gray-500 hover:text-gray-900">
                  Contact
                </a>
                <a href="https://github.com/AdityaPurswani/Docs-For-Dementia-Pipeline" className="text-gray-500 hover:text-gray-900">
                  <Github size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <Twitter size={20} />
                </a>
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-gray-500 hover:text-gray-900"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;