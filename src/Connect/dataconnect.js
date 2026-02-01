import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qcwogvwamfxwhlavwves.supabase.co'
const supabaseKey = 'sb_publishable_nh9CwptMHbq50Nb7pOa5jg_0yFJux1j'

export const supabase = createClient(supabaseUrl, supabaseKey)