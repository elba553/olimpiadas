import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pjyvtxpnsktzmiskbxqi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqeXZ0eHBuc2t0em1pc2tieHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4ODU4MDUsImV4cCI6MjA1ODQ2MTgwNX0.iMtBuDlYvPQMzlED66VeqYaP5aEG02NESTG3I-D1EyA';
export const supabase = createClient(supabaseUrl, supabaseKey, {
}
);
