import { useEffect, useState } from 'react';
import { Github, Star, GitFork, BookOpen, ExternalLink } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

interface Profile {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
}

export function GitHubApp() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  // Get all our shiz. Get the profile info, and the repo list
  useEffect(() => {
    Promise.all([
      fetch('https://api.github.com/users/Licensed-Driver').then(res => res.json()),
      fetch('https://api.github.com/users/Licensed-Driver/repos?sort=updated&per_page=6').then(res => res.json())
    ])
      .then(([profileData, reposData]) => {
        setProfile(profileData);
        setRepos(reposData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch GitHub data", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto">
      {/* Header Profile Section */}
      <div className="bg-gray-50 border-b border-gray-200 p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm shrink-0">
          <img src={profile?.avatar_url || "https://github.com/Licensed-Driver.png"} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col items-center md:items-start flex-1">
          {loading && !profile ? (
            <div className="animate-pulse space-y-3 w-full max-w-sm flex flex-col items-center md:items-start">
               <div className="h-8 bg-gray-200 rounded w-1/2"></div>
               <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
               <div className="h-16 bg-gray-200 rounded w-full"></div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900">{profile?.name || "Layne Pitman"}</h1>
              <p className="text-gray-500 text-lg mb-2">{profile?.login || "Licensed-Driver"}</p>
              <p className="text-gray-700 text-center md:text-left mb-3 max-w-xl">
                {profile?.bio || "No bio available."}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900">{profile?.followers || 0}</span> followers
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900">{profile?.following || 0}</span> following
                </div>
              </div>

              <a 
                href="https://github.com/Licensed-Driver" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <Github size={16} />
                View on GitHub
                <ExternalLink size={14} className="ml-1 opacity-70" />
              </a>
            </>
          )}
        </div>
      </div>

      {/* Contributions Section */}
      <div className="p-8 border-b border-gray-100 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 w-full max-w-4xl text-left">Contributions</h2>
        <div className="max-w-4xl w-full p-6 bg-gray-50 rounded-xl border border-gray-200 overflow-x-auto">
           <div className="min-w-fit mx-auto flex justify-center">
             <GitHubCalendar 
               username="Licensed-Driver" 
               colorScheme="light"
               blockSize={14}
               blockMargin={4}
               fontSize={12}
               className='text-black'
               transformData={(contributions) => {
                // Only get the last six months
                 const pastDate = new Date();
                 pastDate.setMonth(pastDate.getMonth() - 6);
                 return contributions.filter(day => new Date(day.date) >= pastDate);
               }}
             />
           </div>
        </div>
      </div>

      {/* Repositories Grid */}
      <div className="p-8 pb-12 flex-1 bg-white">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Recent Repositories</h2>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map(repo => (
              <a 
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all bg-white group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={16} className="text-gray-500 group-hover:text-blue-500" />
                  <h3 className="font-semibold text-blue-600 truncate">{repo.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10">
                  {repo.description || 'No description provided.'}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                      {repo.language}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star size={14} />
                    {repo.stargazers_count}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork size={14} />
                    {repo.forks_count}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
