import React from 'react';
import Navbar from './Component/Navbar.js';
import Footer from './Component/Footer.js';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {/* Your main content goes here */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
