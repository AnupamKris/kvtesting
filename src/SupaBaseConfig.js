import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://llsacclleutwrjyvrema.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsc2FjY2xsZXV0d3JqeXZyZW1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIzNDgyOTgsImV4cCI6MTk5NzkyNDI5OH0.nTpGVsHNSQ3OflCeevd8qGeeLFrhXXT-G35c8yxhQvk";
const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

export { supabase };
