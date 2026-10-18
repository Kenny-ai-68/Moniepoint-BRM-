import { createClient, SupabaseClient } from '@supabase/supabase-js';

// User's Supabase project base URL (normalized to strip /rest/v1/ suffix)
const RAW_URL = import.meta.env.VITE_SUPABASE_URL || 'https://vajzmqhgwdcstvjdjytr.supabase.co';

export function normalizeSupabaseUrl(url: string): string {
  if (!url) return '';
  return url.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '').trim();
}

export const SUPABASE_PROJECT_URL = normalizeSupabaseUrl(RAW_URL);

export const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_WuaAAnR3WwG0HNV90D5iVA_M8LiDgvg';

// Check if user set custom anon key in localStorage or env
export function getSupabaseAnonKey(): string {
  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem('kenny_olu_supabase_anon_key');
    if (localKey && localKey.trim()) return localKey.trim();
  }
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  if (envKey && !envKey.includes('your-anon-key')) return envKey.trim();
  return DEFAULT_SUPABASE_ANON_KEY;
}

export function saveSupabaseAnonKey(key: string): void {
  if (typeof window !== 'undefined') {
    if (key.trim()) {
      localStorage.setItem('kenny_olu_supabase_anon_key', key.trim());
    } else {
      localStorage.removeItem('kenny_olu_supabase_anon_key');
    }
  }
}

// Instantiate client dynamically based on current configuration
let cachedClient: SupabaseClient | null = null;
let lastKeyUsed: string = '';

export function getSupabaseClient(): SupabaseClient | null {
  const currentKey = getSupabaseAnonKey();
  if (!currentKey) return null;

  if (cachedClient && lastKeyUsed === currentKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(SUPABASE_PROJECT_URL, currentKey);
    lastKeyUsed = currentKey;
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

export const isSupabaseConfigured = (): boolean => {
  return Boolean(SUPABASE_PROJECT_URL && getSupabaseAnonKey());
};

/**
 * Submit lead inquiry directly to Supabase public.leads table
 */
export async function submitLeadToSupabase(lead: {
  fullName: string;
  phone: string;
  businessName: string;
  deliveryState?: string;
  businessAddress?: string;
  serviceType: string;
  loanAmountRequested?: string;
  bvnProvided?: boolean;
  ninProvided?: boolean;
  notes?: string;
}) {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, fallback: true, message: 'Supabase anon key not set yet. Saved locally.' };
  }

  try {
    const { data, error } = await client.from('leads').insert([
      {
        full_name: lead.fullName,
        phone: lead.phone,
        business_name: lead.businessName,
        delivery_state: lead.deliveryState || 'Lagos State',
        business_address: lead.businessAddress || '',
        service_type: lead.serviceType,
        loan_amount_requested: lead.loanAmountRequested || null,
        bvn_provided: lead.bvnProvided ?? true,
        nin_provided: lead.ninProvided ?? true,
        notes: lead.notes || '',
        status: 'New',
      },
    ]).select();

    if (error) {
      console.warn('Supabase lead insert response:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Failed to submit lead to Supabase:', err);
    return { success: false, error: err };
  }
}

/**
 * Test connectivity with Supabase
 */
export async function testSupabaseConnection(): Promise<{ success: boolean; message: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, message: 'Missing Anon Key. Please paste your Supabase anon/public key.' };
  }

  try {
    const { error } = await client.from('site_content').select('id').limit(1);
    if (error) {
      return { success: false, message: `Connected to URL, but table check returned: ${error.message}` };
    }
    return { success: true, message: `Successfully connected to Supabase (${SUPABASE_PROJECT_URL})!` };
  } catch (e: any) {
    return { success: false, message: e?.message || 'Connection failed.' };
  }
}

/**
 * Fetch leads directly from Supabase public.leads
 */
export async function fetchLeadsFromSupabase() {
  const client = getSupabaseClient();
  if (!client) return { success: false, data: [] };

  try {
    const { data, error } = await client
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch leads error:', error);
      return { success: false, error, data: [] };
    }
    return { success: true, data: data || [] };
  } catch (err) {
    return { success: false, error: err, data: [] };
  }
}
