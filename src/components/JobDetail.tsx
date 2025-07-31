import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface JobDetailProps {
  job: any;
  onClose: () => void;
  currentLanguage: string;
}

export const JobDetail: React.FC<JobDetailProps> = ({ job, onClose, currentLanguage }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {job.title[currentLanguage]}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <span className="font-medium text-gray-700">Type</span>
            <span className="ml-2 text-gray-600">{job.type}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-700">Location</span>
            <span className="ml-2 text-gray-600">{job.location}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-700">Department</span>
            <span className="ml-2 text-gray-600">
              {job.department[currentLanguage]}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-700">Posted</span>
            <span className="ml-2 text-gray-600">
              {new Date(job.postedDate).toLocaleDateString(
                currentLanguage === "pt"
                  ? "pt-AO"
                  : currentLanguage === "fr"
                  ? "fr-FR"
                  : "en-US"
              )}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Description</h3>
          <p className="text-gray-700">{job.description[currentLanguage]}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Requirements</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {job.requirements[currentLanguage].map(
              (req: string, index: number) => (
                <li key={index}>{req}</li>
              )
            )}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Benefits</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {job.benefits[currentLanguage].map(
              (benefit: string, index: number) => (
                <li key={index}>{benefit}</li>
              )
            )}
          </ul>
        </div>

        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Apply Now
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
