import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Briefcase, DollarSign, Filter } from 'lucide-react';
import { jobPositions } from '../data/jobs';
import { JobDetail } from './JobDetail';
import { JobPosition } from '../types';
import { ModalFilters } from './ModalFilters';

interface JobListProps {
  currentLanguage: 'pt' | 'en' | 'fr';
}

export interface FilterOptions {
  type: '' | 'full-time' | 'part-time' | 'contract';
  location: string;
  department: string;
  experience: '' | 'entry' | 'mid' | 'senior';
  salary: '' | 'low' | 'medium' | 'high';
  datePosted: '' | '1d' | '7d' | '30d';
}

// Helper type for filter change handler
export interface FilterChangeHandler {
  (field: keyof FilterOptions, value: string): void;
}

export default function JobList({ currentLanguage }: JobListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    type: '',
    location: '',
    department: '',
    experience: '',
    salary: '',
    datePosted: ''
  });
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const filteredJobs = jobPositions.filter(job => {
    const matchesSearch = job.title[currentLanguage]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !filters.type || job.type === filters.type;
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesDepartment = !filters.department || job.department[currentLanguage].toLowerCase().includes(filters.department.toLowerCase());
    const matchesExperience = !filters.experience || job.experienceLevel === filters.experience;
    const matchesSalary = !filters.salary || (
      filters.salary === 'low' && parseInt(job.salaryRange[currentLanguage].split(' ')[0].replace(/[^0-9]/g, '')) < 150000 ||
      filters.salary === 'medium' && parseInt(job.salaryRange[currentLanguage].split(' ')[0].replace(/[^0-9]/g, '')) >= 150000 && parseInt(job.salaryRange[currentLanguage].split(' ')[0].replace(/[^0-9]/g, '')) <= 300000 ||
      filters.salary === 'high' && parseInt(job.salaryRange[currentLanguage].split(' ')[0].replace(/[^0-9]/g, '')) > 300000
    );
    const matchesDate = !filters.datePosted || (
      filters.datePosted === '1d' && new Date(job.postedDate) >= new Date(Date.now() - 24 * 60 * 60 * 1000) ||
      filters.datePosted === '7d' && new Date(job.postedDate) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ||
      filters.datePosted === '30d' && new Date(job.postedDate) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );
    return matchesSearch && matchesType && matchesLocation && matchesDepartment && matchesExperience && matchesSalary && matchesDate;
  });

  const handleFilterChange = (field: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleJobClick = (jobId: string) => {
    setSelectedJob(jobId);
  };

  const handleCloseDetail = () => {
    setSelectedJob(null);
  };

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <div className="space-y-4 relative">
      <ModalFilters
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Rechercher un poste..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-blue-500 hover:text-white transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filtrer
          </button>
        </div>
        <div className="relative">
          {selectedJob ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <JobDetail
                job={jobPositions.find(job => job.id === selectedJob)!}
                onClose={handleCloseDetail}
                currentLanguage={currentLanguage}
              />
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleJobClick(job.id)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title[currentLanguage]}</h3>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.experienceLevel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salaryRange[currentLanguage]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(job.postedDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
