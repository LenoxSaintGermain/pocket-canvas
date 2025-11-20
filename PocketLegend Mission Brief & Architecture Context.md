# **📁 PocketLegend: Mission Brief & Architecture Context**

Date: November 2025  
Status: Alpha Build / Handover  
Core Tech: React (Vite), Tailwind, Supabase, OpenAI/Suno/Gemini (Future Integration)

## **1\. Product Vision (The "Why")**

**PocketLegend** is a retro-futuristic music RPG. It wraps the complexity of Generative Audio (Suno API) inside the tactile nostalgia of a 2001-era iPod Click Wheel interface.

* **The User:** Acts as a "Producer/Manager" guiding a synthetic artist.  
* **The Hook:** "Click to Create." The user scrolls the wheel, selects a vibe (Archetype), and the system generates a hit song.  
* **The Secret Sauce:** The **Sonic DNA Engine**. We do not send raw prompts to Suno. We translate user intent into "Leet Speak" (e.g., Drake \-\> Dr4k3) to bypass copyright filters while maintaining specific sonic textures.

## **2\. Current Technical State**

### **🏗 Frontend (Built & Functional)**

* **Framework:** React \+ Vite \+ TailwindCSS \+ Shadcn UI.  
* **Key Components:**  
  * src/components/ClickWheel.tsx: Handles the circular scroll logic (Math.atan2). Currently uses basic haptics.  
  * src/components/Screen.tsx: The display container for the iPod interface.  
  * src/components/SonicDNATest.tsx: A debug console to test prompt generation without calling the real API.

### **🧠 The Logic Core (Sonic DNA)**

Located in src/lib/sonicDNA/. This is the most critical part of the codebase.

* promptBuilder.ts: The master factory. Takes inputs (Archetype, Vibe) and outputs a string \< 498 chars.  
* leetDictionary.ts: The translation matrix (e.g., { original: 'The Weeknd', leet: 'Th3 W33knd' }).  
* archetypes.ts: Presets like "Trap Soul King" or "Pop R\&B Queen".  
* **Current Limitation:** The logic works, but it's static. It generates text strings but connects to no backend.

### **🗄 Database (Supabase)**

* Tables exist: profiles, artists, tracks.  
* RLS (Row Level Security) is enabled.  
* Auth is wired up via AuthContext.tsx.

## **3\. The Immediate Mission (Next Steps)**

We are currently in **Sprint 2**. Your job is to take the static prototype and make it "live" and "immersive."

### **🔴 PRIORITY 1: Upgrade Sonic DNA Logic**

* **File:** src/lib/sonicDNA/promptBuilder.ts  
* **Issue:** The generateVariant() function (Side B) is currently lazy. It just replaces "track" with "song".  
* **Goal:** "Side B" must feel like a Remix.  
  * *Action:* If Side A is "Trap Soul," Side B should force a "Unplugged" or "Chopped & Screwed" variation by swapping the **Plot Twist** and **Instrumentation** tags programmatically.

### **🔴 PRIORITY 2: Audio/Haptic Immersion**

* **File:** src/components/ClickWheel.tsx  
* **Issue:** It feels dead on desktop.  
* **Goal:** Add mechanical click sounds.  
  * *Action:* Implement a sound trigger that fires every \~15 degrees of rotation. Use a short, crisp mechanical tick (base64 or local asset).

### **🔴 PRIORITY 3: Backend Bridge (Edge Functions)**

* **File:** supabase/functions/ (Empty right now)  
* **Goal:** We need to mock the API call so we can simulate "Generation."  
  * *Action:* Create a Supabase Edge Function that accepts the prompt, waits 3 seconds, and returns a "Success" state to the database so the UI can show a "New Track" animation. (Do not connect real Suno API yet to save costs).

## **4\. Directives for the AI Agent**

1. **Respect the Aesthetic:** We are building for "Cool," not just "Functional." UI animations and sound effects matter as much as the database.  
2. **Protect the Leet Dictionary:** Never alter leetDictionary.ts to remove the obfuscation. That is the product's IP.  
3. **Code Style:** maintain strict TypeScript typing. Use shadcn components for new UI elements.

**Ready to execute. Awaiting your command.**