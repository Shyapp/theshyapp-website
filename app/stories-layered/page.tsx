'use client';
import LayeredParallaxStory from '@/components/scrollytelling/LayeredParallaxStory';

export default function LayeredStoryPage() {
  return (
    <main className="bg-black">
      {/* Scene 1: Discovery - Urban cityscape layers 1-15 */}
      <LayeredParallaxStory sceneName="discovery" height={400}>
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight">
            Meet people
            <span className="block text-yellow-300">nearby</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Not online. Not random.<br />Right here, right now.
          </p>
        </div>
      </LayeredParallaxStory>

      {/* Scene 2: The Venue - Coffee shop interior layers 16-30 */}
      <LayeredParallaxStory sceneName="venue" height={400}>
        <div className="space-y-6">
          <h2 className="text-5xl md:text-7xl font-bold text-white">
            Walk into any
            <span className="block text-yellow-300">Shy Location</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Coffee shops, libraries, gyms, parks — real places where real people connect.
          </p>
        </div>
      </LayeredParallaxStory>

      {/* Scene 3: People Arriving - Character silhouettes layers 31-45 */}
      <LayeredParallaxStory sceneName="arrival" height={400}>
        <div className="space-y-6">
          <h2 className="text-5xl md:text-7xl font-bold text-white">
            See who's
            <span className="block text-yellow-300">here now</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Open the lobby. Browse profiles. No followers, no likes — just people nearby.
          </p>
        </div>
      </LayeredParallaxStory>

      {/* Scene 4: Connection Spark - UI elements, notifications layers 46-60 */}
      <LayeredParallaxStory sceneName="connect" height={400}>
        <div className="space-y-6">
          <h2 className="text-5xl md:text-7xl font-bold text-white">
            Send a
            <span className="block text-yellow-300">1-token request</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Spend a token. Start a conversation. Build something real.
          </p>
        </div>
      </LayeredParallaxStory>

      {/* Scene 5: Conversation Flow - Chat bubbles, messages layers 61-75 */}
      <LayeredParallaxStory sceneName="converse" height={400}>
        <div className="space-y-6">
          <h2 className="text-5xl md:text-7xl font-bold text-white">
            Chat
            <span className="block text-yellow-300">anywhere</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Once connected, message anytime. Rename contacts. Keep what matters.
          </p>
        </div>
      </LayeredParallaxStory>

      {/* Scene 6: Community - Network effect, multiple connections layers 76-89 */}
      <LayeredParallaxStory sceneName="community" height={400}>
        <div className="space-y-8">
          <h2 className="text-5xl md:text-7xl font-bold text-white">
            Build your
            <span className="block text-yellow-300">real network</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            45+ cities. Thousands of locations. Real connections that last.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <a 
              href="/download" 
              className="inline-flex items-center gap-2 bg-yellow-400 text-black font-semibold px-8 py-4 rounded-full hover:bg-yellow-300 transition-all hover:scale-105"
            >
              Download Shy
            </a>
            <a 
              href="/#locations" 
              className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all border border-white/20"
            >
              Explore Locations
            </a>
          </div>
        </div>
      </LayeredParallaxStory>
    </main>
  );
}
