import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Plus, 
  Heart, 
  MessageSquare, 
  Share2, 
  Send, 
  Code2, 
  X, 
  Sparkles,
  Loader2,
  Tag,
  Check
} from 'lucide-react';

interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  title: string;
  titleKu?: string;
  description: string;
  category: string;
  components: string[];
  code?: string;
  likes: number;
  commentsCount: number;
  createdAt: string;
  comments?: Array<{ id: string; author: string; text: string; time: string }>;
}

export const CommunityPage: React.FC = () => {
  const { t, language, setActiveEditorCode, setCurrentPage, userProfile, addXp } = useApp();
  
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  
  // New Post Form
  const [authorName, setAuthorName] = useState(userProfile.name);
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('IoT & Automation');
  const [postComponents, setPostComponents] = useState('Arduino Uno, DHT22, Relay');
  const [postDesc, setPostDesc] = useState('');
  const [postCode, setPostCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Active Comment Box
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [sendingComment, setSendingComment] = useState(false);

  const defaultCommunityPosts: CommunityPost[] = [
    {
      id: 'post-1',
      author: 'Aso Barzan',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      title: 'Smart Greenhouse with ESP32 & DHT22 in Erbil',
      titleKu: 'خانووی شوشەیی زیرەک بە ESP32 و شێداری DHT22 لە هەولێر',
      description: 'Built an automated greenhouse monitoring temperature, soil moisture, and venting fans using ESP32 with Telegram notifications.',
      category: 'IoT & Automation',
      components: ['ESP32 DevKit', 'DHT22 Sensor', 'Capacitive Soil Moisture', '5V Relay Module', '12V Exhaust Fan'],
      likes: 42,
      commentsCount: 7,
      createdAt: '2 hours ago',
      comments: [
        { id: 'c1', author: 'Darya K.', text: 'Very impressive! How are you calibrating the capacitive sensor?', time: '1 hour ago' },
        { id: 'c2', author: 'Aso Barzan', text: 'I mapped dry air reading (~3200) and submerged in water (~1400) via analogRead.', time: '45 mins ago' }
      ]
    },
    {
      id: 'post-2',
      author: 'Karwan Slemani',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
      title: 'Autonomous Maze Solver Robot with 3x HC-SR04',
      titleKu: 'ڕۆبۆتی پێچاوپێچ بڕی خۆکار بە ٣ هەستەوەری HC-SR04',
      description: 'Created an Arduino Uno maze navigation car using 3 ultrasonic sensors (left, front, right) and L298N dual H-bridge motor driver.',
      category: 'Robotics',
      components: ['Arduino Uno R3', '3x HC-SR04 Ultrasonic', 'L298N Motor Driver', '2x TT Geared Motors', '7.4V Li-ion Battery'],
      likes: 38,
      commentsCount: 4,
      createdAt: '5 hours ago',
      comments: []
    }
  ];

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/community/posts');
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (res.ok && data.posts && data.posts.length > 0) {
          setPosts(data.posts);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn('[Community] Backend not reachable, using local store');
    } finally {
      setLoading(false);
    }

    try {
      const local = localStorage.getItem('krd_community_posts');
      if (local) {
        setPosts(JSON.parse(local));
      } else {
        setPosts(defaultCommunityPosts);
      }
    } catch {
      setPosts(defaultCommunityPosts);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    if (likedPosts[postId]) return;
    setLikedPosts(prev => ({ ...prev, [postId]: true }));
    setPosts(prev => {
      const updated = prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p);
      try { localStorage.setItem('krd_community_posts', JSON.stringify(updated)); } catch {}
      return updated;
    });

    try {
      await fetch(`/api/community/posts/${postId}/like`, { method: 'POST' });
    } catch (e) {
      // offline like saved locally
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postDesc) return;
    setSubmitting(true);

    const componentsArray = postComponents.split(',').map(s => s.trim()).filter(Boolean);
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: authorName || 'KRD Maker',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(authorName || 'KRD')}`,
      title: postTitle,
      description: postDesc,
      category: postCategory,
      components: componentsArray,
      code: postCode,
      likes: 1,
      commentsCount: 0,
      createdAt: 'Just now',
      comments: []
    };

    setPosts(prev => {
      const updated = [newPost, ...prev];
      try { localStorage.setItem('krd_community_posts', JSON.stringify(updated)); } catch {}
      return updated;
    });

    try {
      await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
    } catch (err) {
      // saved locally
    } finally {
      setSubmitting(false);
      setShowCreateModal(false);
      setPostTitle('');
      setPostDesc('');
      setPostCode('');
      addXp(80);
    }
  };

  const handleSendComment = async (postId: string) => {
    if (!commentText.trim() || sendingComment) return;
    setSendingComment(true);

    try {
      const res = await fetch(`/api/community/posts/${postId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: userProfile.name,
          text: commentText
        })
      });

      if (res.ok) {
        const data = await res.json();
        setPosts(prev => prev.map(p => {
          if (p.id === postId) {
            const existingComments = p.comments || [];
            return {
              ...p,
              commentsCount: data.commentsCount,
              comments: [...existingComments, data.comment]
            };
          }
          return p;
        }));
        setCommentText('');
        addXp(20);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSendingComment(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 text-xs font-mono mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Maker Collaborative Forum</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {t.community.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            {t.community.subtitle}
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>{t.community.createPost}</span>
        </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-xs flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
            <span>Loading community builds...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs bg-[#0D1424] rounded-2xl border border-slate-800">
            {t.community.noPostsFound}
          </div>
        ) : (
          posts.map((post) => {
            const isLiked = likedPosts[post.id];
            const isCommenting = activeCommentPostId === post.id;

            return (
              <div
                key={post.id}
                className="p-6 rounded-3xl bg-[#0D1424] border border-slate-800 hover:border-cyan-500/30 transition-all space-y-4 shadow-xl"
              >
                {/* Author row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{post.author}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                        <span>{post.createdAt}</span>
                        <span>•</span>
                        <span className="text-cyan-400">{post.category}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-100">
                    {language === 'ku' && post.titleKu ? post.titleKu : post.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                {/* Components Badges */}
                {post.components && post.components.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.components.map((c, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-purple-300">
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                {/* Code snippet if attached */}
                {post.code && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-cyan-400 font-semibold text-[11px] flex items-center gap-1">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Source Sketch Attached</span>
                      </span>
                      <button
                        onClick={() => {
                          setActiveEditorCode(post.code!);
                          setCurrentPage('editor');
                        }}
                        className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 text-[10px] font-mono hover:bg-blue-900 transition-colors cursor-pointer"
                      >
                        Open in Code Studio
                      </button>
                    </div>
                    <div className="p-3 rounded-xl bg-[#070B14] border border-slate-800 font-mono text-xs text-cyan-200 overflow-x-auto max-h-40">
                      <pre>{post.code}</pre>
                    </div>
                  </div>
                )}

                {/* Actions row */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isLiked ? 'text-rose-500 font-bold' : 'hover:text-rose-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                      <span>{post.likes}</span>
                    </button>

                    <button
                      onClick={() => setActiveCommentPostId(isCommenting ? null : post.id)}
                      className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.commentsCount || 0}</span>
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                {isCommenting && (
                  <div className="pt-3 space-y-3 border-t border-slate-800">
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {post.comments && post.comments.length > 0 ? (
                        post.comments.map((cm) => (
                          <div key={cm.id} className="p-2.5 rounded-xl bg-[#070B14] border border-slate-800 text-xs space-y-0.5">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="font-bold text-cyan-400">{cm.author}</span>
                              <span className="text-slate-500">{cm.time}</span>
                            </div>
                            <p className="text-slate-300">{cm.text}</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-[11px] text-slate-500 italic">No comments yet. Be the first!</div>
                      )}
                    </div>

                    {/* Add Comment Input */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder={t.community.writeComment}
                        className="flex-1 bg-[#070B14] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
                      />
                      <button
                        onClick={() => handleSendComment(post.id)}
                        disabled={!commentText.trim() || sendingComment}
                        className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs disabled:opacity-50 cursor-pointer"
                      >
                        {sendingComment ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : t.community.sendComment}
                      </button>
                    </div>
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

      {/* Create New Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0D1424] border border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                <span>{t.community.createPost}</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">Author Name:</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">{t.community.postCategory}:</label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="IoT & Automation">IoT & Automation</option>
                    <option value="Robotics">Robotics</option>
                    <option value="Sensors & Measurement">Sensors & Measurement</option>
                    <option value="LEDs & Lighting">LEDs & Lighting</option>
                    <option value="Help & Troubleshooting">Help & Troubleshooting</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">{t.community.postTitle}:</label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Kurdish Voice Synthesizer with Arduino Nano"
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">{t.community.postComponents}:</label>
                <input
                  type="text"
                  value={postComponents}
                  onChange={(e) => setPostComponents(e.target.value)}
                  placeholder="Arduino Uno, HC-SR04, Servo SG90"
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">{t.community.postDesc}:</label>
                <textarea
                  required
                  rows={4}
                  value={postDesc}
                  onChange={(e) => setPostDesc(e.target.value)}
                  placeholder="Describe your design decisions, circuit wiring, or question..."
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">{t.community.postCode}:</label>
                <textarea
                  rows={3}
                  value={postCode}
                  onChange={(e) => setPostCode(e.target.value)}
                  placeholder="// Paste Arduino C++ code sketch here..."
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-2.5 text-white font-mono outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Publishing...' : t.community.submitPost}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
