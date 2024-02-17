import {
  StarIcon,
  CodeBracketIcon,
  ArrowPathRoundedSquareIcon,
} from '@heroicons/react/24/solid';
import { Repo as RepoType } from '@/types';

type RepoProps = {
  repo: RepoType;
};

export const Repo = ({ repo }: RepoProps) => {
  return (
    <div
      key={repo.id}
      className="flex mb-4 border-1 border-l-gray-700 rounded-md p-4 transition-all duration-300 hover:bg-gray-100 shadow-md"
    >
      <div className="flex flex-col" style={{ flex: 3 }}>
        <a
          href={repo?.html_url}
          className="text-blue-500 font-semibold text-md block mb-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          {repo.name}
        </a>
        <p className="text-md text-gray-600 mb-2">{repo.description}</p>
        <span className="text-md text-gray-600">
          <CodeBracketIcon className="h-4 w-4 inline mr-1 text-purple-500" />
          {repo.language}
        </span>
      </div>
      <div className="flex flex-col items-end" style={{ flex: 1 }}>
        <span className="text-md flex items-center text-gray-600 mb-2">
          {repo.stargazers_count}
          <StarIcon className="h-4 w-4 inline ml-2 text-yellow-500" />
        </span>
        <span className="text-md flex items-center text-gray-600">
          {repo.forks_count}
          <ArrowPathRoundedSquareIcon className="h-4 w-4 inline ml-2 text-green-500" />
        </span>
      </div>
    </div>
  );
};
