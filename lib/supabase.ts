import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yqjingdtqtyufeaclfrr.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxamluZ2R0cXR5dWZlYWNsZnJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MzI0MjgsImV4cCI6MjA3NDUwODQyOH0.dn4LvI9kVjkZvyrOHHg4dHDeNd61E2al71FSPiypmEU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
