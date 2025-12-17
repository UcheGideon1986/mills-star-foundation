import React from 'react';

const Team = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Team</h2>
          <p className="mt-4 text-xl text-gray-600">Meet the people behind Mills Star Foundation</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Team Member Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">Mr Francis Bakre Mills</h3>
              <p className="text-blue-600 font-medium">Founder, Mills Star Foundation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
