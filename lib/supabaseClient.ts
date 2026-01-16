import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ozqrvflrttjtxsbwoskz.supabase.co";
const supabaseKey = "sb_publishable_FoZ8jZJK2LCd6Aa-7xR8dg_bvQZV9a8";

export const supabase = createClient(supabaseUrl, supabaseKey);
