import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-slate-200 shadow-xl  text-gray-600 py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/3 flex items-center flex-col justify-center md:justify-start md:flex-row">
            <img src='./icon-192.png' alt="Usmania Blood Bank Logo" className="h-14 mr-2" /> {/* Add your logo here */}
            <div>
              <h2 className="text-2xl font-bold mb-2 md:mb-0 text-center md:text-left">Digital Translator</h2>
              <p className="text-center md:text-left">Easily Translate Documents!</p>
            </div>
          </div>
          <div className="mt-6 md:mt-0 md:w-2/3 flex flex-col md:flex-row justify-center md:justify-end">
            <nav className="flex flex-wrap justify-center md:justify-end">
              <a href="#" className="mr-4 hover:text-red-500">About</a>
              <a href="#" className="mr-4 hover:text-red-500">Contact Us</a>
              <a href="#" className="hover:text-red-500">Our Team</a>
            </nav>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          <p className='mb-1'>&copy; 2024 Digital Translator. All rights reserved.</p>
          <p>Developed by || <span className=' font-bold'>Muneeb Wali Khan</span></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
