import { supabase } from "@/integrations/supabase/client";

export interface GenerateTrackParams {
  prompt: string;
  tags?: string[];
  artistId: string;
}

export interface GeneratedTrack {
  id: string;
  title: string;
  audioUrl: string;
  imageUrl: string;
  status: 'processing' | 'completed' | 'failed';
}

/**
 * Generate a music track using the Sonic DNA prompt
 * Invokes the generate-track edge function
 */
export async function generateTrack(params: GenerateTrackParams): Promise<GeneratedTrack> {
  try {
    const { data, error } = await supabase.functions.invoke('generate-track', {
      body: {
        prompt: params.prompt,
        tags: params.tags || [],
        artistId: params.artistId
      }
    });

    if (error) {
      console.error('[generationService] Edge function error:', error);
      throw new Error(error.message || 'Failed to generate track');
    }

    if (!data.success) {
      throw new Error(data.error || 'Generation failed');
    }

    return data.track;
  } catch (error) {
    console.error('[generationService] Generate track error:', error);
    throw error;
  }
}

/**
 * Fetch user's tracks from the database
 */
export async function fetchUserTracks(artistId?: string) {
  try {
    let query = supabase
      .from('tracks')
      .select('*')
      .order('created_at', { ascending: false });

    if (artistId) {
      query = query.eq('artist_id', artistId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[generationService] Fetch tracks error:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('[generationService] Fetch tracks error:', error);
    throw error;
  }
}
