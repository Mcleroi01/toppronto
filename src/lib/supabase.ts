import { createClient } from '@supabase/supabase-js';

// Vite uses import.meta.env for environment variables
console.log('Supabase Environment Variables:', {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? 'Present' : 'Missing',
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Present' : 'Missing',
  NODE_ENV: import.meta.env.MODE
});

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file');
}

const supabaseOptions = {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      // Important: avoid returning inserted rows by default to prevent RLS SELECT violations
      // PostgREST uses this header to return minimal response for inserts/upsserts
      // You can override per-request if you need the inserted representation
      Prefer: 'return=minimal',
    },
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, supabaseOptions);

// Tester la connexion et les permissions RLS
const testConnection = async () => {
  try {
    console.log('Testing Supabase connection and RLS...');
    
    // Test 1: Compter les offres actives
    const { count, error: countError } = await supabase
      .from('job_offers')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);
      
    // Test 2: Récupérer les 5 premières offres
    const { data: jobsData, error: fetchError } = await supabase
      .from('job_offers')
      .select('*')
      .eq('is_active', true)
      .limit(5);
    
    if (countError || fetchError) {
      console.error('Supabase test failed:', {
        countError,
        fetchError,
        rlsHint: 'Vérifiez les politiques RLS dans Supabase > Authentication > Policies'
      });
    } else {
      console.log('Supabase test results:', {
        activeJobsCount: count,
        fetchedJobs: jobsData?.length || 0,
        firstJob: jobsData?.[0] ? 'exists' : 'none',
        rlsStatus: 'Si le comptage est différent de zéro mais que fetchedJobs est vide, vérifiez les politiques RLS'
      });
    }
  } catch (err) {
    console.error('Error testing Supabase connection:', err);
  }
};

// Exécuter le test de connexion
testConnection();

export default supabase;
