import React from 'react';
import { motion } from 'framer-motion';
import {
  Filter,
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  Calendar,
  X
} from 'lucide-react';
import { FilterOptions, FilterChangeHandler } from './JobList';

interface ModalFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFilterChange: FilterChangeHandler;
}

export const ModalFilters = ({ isOpen, onClose, filters, onFilterChange }: ModalFiltersProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl z-50"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtrer les postes
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Type de contrat */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <Briefcase className="w-4 h-4" />
              Type de contrat
            </label>
            <select
              value={filters.type}
              onChange={(e) => onFilterChange('type', e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les types</option>
              <option value="full-time">Temps plein</option>
              <option value="part-time">Temps partiel</option>
              <option value="contract">Contrat</option>
            </select>
          </div>

          {/* Localisation */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              Localisation
            </label>
            <select
              value={filters.location}
              onChange={(e) => onFilterChange('location', e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes les localités</option>
              <option value="luanda">Luanda</option>
              <option value="malanje">Malanje</option>
            </select>
          </div>

          {/* Département */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <Briefcase className="w-4 h-4" />
              Département
            </label>
            <select
              value={filters.department}
              onChange={(e) => onFilterChange('department', e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les départements</option>
              <option value="operations">Opérations</option>
              <option value="logistics">Logistique</option>
              <option value="customer-service">Service client</option>
            </select>
          </div>

          {/* Niveau d'expérience */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              Niveau d'expérience
            </label>
            <select
              value={filters.experience}
              onChange={(e) => onFilterChange('experience', e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les niveaux</option>
              <option value="entry">Débutant</option>
              <option value="mid">Intermédiaire</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          {/* Fourchette salariale */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4" />
              Fourchette salariale
            </label>
            <select
              value={filters.salary}
              onChange={(e) => onFilterChange('salary', e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes les fourchettes</option>
              <option value="low">Bas (moins de 150 000 AOA)</option>
              <option value="medium">Moyen (150 000 - 300 000 AOA)</option>
              <option value="high">Élevé (plus de 300 000 AOA)</option>
            </select>
          </div>

          {/* Date de publication */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              Date de publication
            </label>
            <select
              value={filters.datePosted}
              onChange={(e) => onFilterChange('datePosted', e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes les dates</option>
              <option value="1d">Dernières 24h</option>
              <option value="7d">Dernières 7 jours</option>
              <option value="30d">Derniers 30 jours</option>
            </select>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
