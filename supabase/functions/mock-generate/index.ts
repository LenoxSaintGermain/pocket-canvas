
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { prompt, archetype } = await req.json()

        console.log(`Received generation request for: ${archetype}`)
        console.log(`Prompt: ${prompt}`)

        // Simulate "Generation" delay (3 seconds)
        await new Promise(resolve => setTimeout(resolve, 3000))

        // Mock response
        const mockTrack = {
            id: `track_${Date.now()}`,
            title: `Generated ${archetype} Track`,
            status: 'ready',
            audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder
            image_url: 'https://placehold.co/600x600/1a1a1a/ffffff?text=Cover+Art',
            created_at: new Date().toISOString()
        }

        return new Response(
            JSON.stringify(mockTrack),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200
            },
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 400
            },
        )
    }
})
