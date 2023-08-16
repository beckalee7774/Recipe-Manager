import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://lyeutanfhwlnpalhenaj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5ZXV0YW5maHdsbnBhbGhlbmFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE3ODAzNzEsImV4cCI6MjAwNzM1NjM3MX0.S8nlR5NCpX0hK5btR0M0GiwYmAUsSc9k2MrEBQfI1ss";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
