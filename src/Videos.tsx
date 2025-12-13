import { useEffect, useMemo, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Card } from './components/figma/ui/card';
import { Button } from './components/figma/ui/button';

type SourceType = 'file' | 'youtube' | 'vimeo';

interface VideoItem {
  id: string;
  title: string;
  description?: string;
  category?: string;
  url: string;
  thumbnail?: string;
  sourceType?: SourceType;
  uploadedAt?: string;
}

function isYouTube(url: string) {
  return /youtu\.be|youtube\.com/.test(url);
}

function isVimeo(url: string) {
  return /vimeo\.com/.test(url);
}

export function Videos() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/data/videos.json');
        const data = await res.json().catch(() => ({ videos: [] }));
        const list: VideoItem[] = Array.isArray(data?.videos) ? data.videos : [];
        if (!list.length) {
          const stored = localStorage.getItem('millsStarVideos');
          if (stored) setVideos(JSON.parse(stored));
          else setVideos([]);
        } else {
          setVideos(list);
        }
      } catch {
        const stored = localStorage.getItem('millsStarVideos');
        setVideos(stored ? JSON.parse(stored) : []);
      }
    };
    load();
  }, []);

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(videos.map(v => v.category || 'general')))],
    [videos]
  );

  const filtered = useMemo(
    () => (selectedCategory === 'all' ? videos : videos.filter(v => (v.category || 'general') === selectedCategory)),
    [videos, selectedCategory]
  );

  const open = (index: number) => setActiveIndex(index);
  const close = () => setActiveIndex(null);
  const next = () => setActiveIndex(i => (i === null ? null : (i + 1) % filtered.length));
  const prev = () => setActiveIndex(i => (i === null ? null : (i - 1 + filtered.length) % filtered.length));

  const active = activeIndex !== null ? filtered[activeIndex] : null;

  return (
    <div>
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/90 z-10" />
        <img
          src="/images/wheelchair-action.jpg"
          alt="Videos"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-white mb-4">Videos</h1>
          <p className="text-xl">Stories and moments in motion</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No videos available yet</p>
              <p className="text-gray-400 text-sm mt-2">Add entries to public/data/videos.json</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((v, idx) => (
                <Card key={v.id} className="overflow-hidden group relative">
                  <button onClick={() => open(idx)} className="w-full text-left">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={v.thumbnail || 'https://placehold.co/800x450/1e40af/ffffff?text=Video'}
                        alt={v.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="h-12 w-12 text-white drop-shadow" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{v.title}</h3>
                      {v.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{v.description}</p>
                      )}
                    </div>
                  </button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {active && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={close}>
          <button onClick={close} className="absolute top-4 right-4 text-white hover:text-gray-300">
            <X className="h-8 w-8" />
          </button>

          {filtered.length > 1 && (
            <>
              <button
                onClick={e => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-4 text-white hover:text-gray-300"
              >
                <ChevronLeft className="h-12 w-12" />
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-4 text-white hover:text-gray-300"
              >
                <ChevronRight className="h-12 w-12" />
              </button>
            </>
          )}

          <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            {isYouTube(active.url) ? (
              <div className="relative pt-[56.25%] w-full">
                <iframe
                  src={active.url.replace('watch?v=', 'embed/')}
                  title={active.title}
                  className="absolute inset-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : isVimeo(active.url) ? (
              <div className="relative pt-[56.25%] w-full">
                <iframe
                  src={active.url.replace('vimeo.com', 'player.vimeo.com/video')}
                  title={active.title}
                  className="absolute inset-0 w-full h-full rounded-lg"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <video
                src={active.url}
                controls
                className="w-full max-h-[80vh] rounded-lg"
                poster={active.thumbnail}
              />
            )}
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-semibold">{active.title}</h3>
              {active.description && <p className="text-gray-300 text-sm mt-1">{active.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
