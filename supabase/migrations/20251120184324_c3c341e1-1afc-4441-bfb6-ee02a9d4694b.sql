-- Add status column to tracks table for generation workflow
ALTER TABLE public.tracks 
ADD COLUMN status text DEFAULT 'completed' CHECK (status IN ('processing', 'completed', 'failed'));

-- Add index for faster status queries
CREATE INDEX idx_tracks_status ON public.tracks(status);

COMMENT ON COLUMN public.tracks.status IS 'Track generation status: processing, completed, or failed';