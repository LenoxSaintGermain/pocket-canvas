import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Mock Suno API Response - Simulates 3-second generation delay
 * TODO: Replace with actual Suno API integration
 */
async function mockSunoResponse(prompt: string): Promise<{
  audioUrl: string;
  imageUrl: string;
  title: string;
}> {
  console.log(`[MOCK] Generating track for prompt: ${prompt.substring(0, 50)}...`);
  
  // Simulate 3-second processing delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Generate mock URLs
  const trackId = crypto.randomUUID();
  return {
    audioUrl: `https://cdn.suno.ai/mock/${trackId}.mp3`,
    imageUrl: `https://cdn.suno.ai/mock/${trackId}.jpg`,
    title: `Track ${trackId.split('-')[0]}`
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse request body
    const { prompt, tags, artistId } = await req.json();
    
    if (!prompt || !artistId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: prompt, artistId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user ID from JWT
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authorization token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[generate-track] User ${user.id} generating track for artist ${artistId}`);

    // 1. Insert track record with 'processing' status
    const { data: track, error: insertError } = await supabase
      .from('tracks')
      .insert({
        user_id: user.id,
        artist_id: artistId,
        title: 'Generating...',
        suno_prompt: prompt,
        leet_code: tags?.join(', ') || '',
        status: 'processing'
      })
      .select()
      .single();

    if (insertError) {
      console.error('[generate-track] Insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create track record', details: insertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[generate-track] Track ${track.id} created with status 'processing'`);

    // 2. Call mock Suno API (3-second delay)
    const mockResult = await mockSunoResponse(prompt);

    // 3. Update track with completed status and mock URLs
    const { error: updateError } = await supabase
      .from('tracks')
      .update({
        title: mockResult.title,
        audio_url: mockResult.audioUrl,
        status: 'completed'
      })
      .eq('id', track.id);

    if (updateError) {
      console.error('[generate-track] Update error:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update track', details: updateError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Award XP to artist (10 XP per track generated)
    const { error: xpError } = await supabase
      .from('artists')
      .update({
        xp: supabase.rpc('increment', { x: 10 })
      })
      .eq('id', artistId);

    if (xpError) {
      console.error('[generate-track] XP update error:', xpError);
      // Don't fail the request if XP update fails
    } else {
      console.log(`[generate-track] Awarded 10 XP to artist ${artistId}`);
    }

    console.log(`[generate-track] Track ${track.id} completed successfully`);

    // Return completed track data
    return new Response(
      JSON.stringify({
        success: true,
        track: {
          id: track.id,
          title: mockResult.title,
          audioUrl: mockResult.audioUrl,
          imageUrl: mockResult.imageUrl,
          status: 'completed'
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[generate-track] Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
