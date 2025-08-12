import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Briefcase, DollarSign, Filter, Loader2 } from 'lucide-react';
import { JobDetail } from './JobDetail';
import { ModalFilters } from './ModalFilters';
import { getJobOffers, type JobOffer, type JobFilters } from '@/services/supabase/jobService';

interface JobListProps {
  currentLanguage: 'pt' | 'en' | 'fr';
}

export interface FilterOptions {
  type: Array<'full-time' | 'part-time' | 'contract'>;
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

// Fonction utilitaire pour formater la date
const formatDate = (dateString: string, locale: string = 'fr-FR') => {
  return new Date(dateString).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function JobList({ currentLanguage }: JobListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<JobOffer[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    type: [],
    location: '',
    department: '',
    experience: '',
    salary: '',
    datePosted: ''
  });
  const [selectedJob, setSelectedJob] = useState<JobOffer | null>(null);

  // Fetch jobs from Supabase
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Convert our filter format to the Supabase filter format
        const supabaseFilters: JobFilters = {
          is_active: true,
          search: searchQuery || undefined,
          location: filters.location || undefined,
          employment_type: filters.type.length > 0 ? filters.type : undefined,
          date_posted: filters.datePosted || undefined
        };

        const jobs = await getJobOffers(supabaseFilters);
        
        if (jobs === null) {
          throw new Error('Failed to fetch jobs');
        }
        
        setJobs(jobs);
      } catch (err) {
        console.error('Error loading jobs:', err);
        setError('Failed to load job offers. Please try again later.');
        setJobs([]); // Réinitialiser la liste des jobs en cas d'erreur
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, [searchQuery, filters]);

  const filteredJobs = jobs.filter(job => {
    if (!job.is_active) return false;
    
    // Filter by job type
    const matchesType = filters.type.length === 0 || 
      filters.type.includes(job.employment_type as any);

    // Filter by location (handled by Supabase)
    
    // Filter by experience
    const matchesExperience = !filters.experience;

    // Filter by salary (if available in the future)
    const matchesSalary = !filters.salary;

    // Filter by date posted
    const now = new Date();
    const jobDate = new Date(job.created_at);
    const daysAgo = (now.getTime() - jobDate.getTime()) / (1000 * 60 * 60 * 24);
    
    const matchesDate = !filters.datePosted ||
      (filters.datePosted === '1d' && daysAgo <= 1) ||
      (filters.datePosted === '7d' && daysAgo <= 7) ||
      (filters.datePosted === '30d' && daysAgo <= 30);

    return matchesType && matchesExperience && matchesSalary && matchesDate;
  });

  const handleFilterChange = (field: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleJobClick = (jobId: string) => {
    const jobToSelect = jobs.find((job) => job.id === jobId);
    if (jobToSelect) {
      setSelectedJob(jobToSelect);
    }
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
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
            </div>
          ) : error ? (
            <div className="text-red-600 p-4 bg-red-50 rounded-lg">
              {error}
            </div>
          ) : selectedJob ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <JobDetail
                job={selectedJob}
                onClose={handleCloseDetail}
                currentLanguage={currentLanguage}
              />
            </motion.div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 mb-4">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {currentLanguage === 'en' 
                  ? 'No job offers found' 
                  : currentLanguage === 'pt' 
                    ? 'Nenhuma vaga encontrada' 
                    : 'Aucune offre d\'emploi trouvée'}
              </h3>
              <p className="text-gray-500">
                {currentLanguage === 'en'
                  ? 'Try adjusting your search or filter criteria'
                  : currentLanguage === 'pt'
                    ? 'Tente ajustar sua pesquisa ou critérios de filtro'
                    : 'Essayez d\'ajuster votre recherche ou vos critères de filtrage'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => handleJobClick(job.id)}
                  className="p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 bg-white transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {job.title}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {job.employment_type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{job.location}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{job.employment_type}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span>{job.salary_range}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>
                        {new Date(job.created_at).toLocaleDateString("fr-FR")}
                      </span>
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
