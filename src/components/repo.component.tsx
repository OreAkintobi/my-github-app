import {
  StarIcon,
  CodeBracketIcon,
  ArrowPathRoundedSquareIcon,
  LinkIcon,
} from '@heroicons/react/24/solid';
import { Repo as RepoType } from '@/types';
import { useTheme } from '@/theme';

type RepoProps = {
  repo: RepoType;
};

export const Repo = ({ repo }: RepoProps) => {
  const theme = useTheme();

  return (
    <div
      key={repo.id}
      className={`flex mb-4 border border-${theme.color}-300 rounded-md p-4 transition-all duration-300 hover:bg-${theme.color}-50 shadow-md`}
    >
      <div className="flex flex-col" style={{ flex: 3 }}>
        <a
          href={repo?.html_url}
          className={`text-${theme.color}-700 font-semibold text-md mb-2`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkIcon className={`h-4 w-4 inline text-${theme.color}-700`} />{' '}
          {repo.name}
        </a>
        <p className="text-md text-gray-600 mb-2">{repo.description}</p>
        <span className="text-md text-gray-600">
          <CodeBracketIcon
            className={`h-4 w-4 inline mr-1 text-${theme.color}-700`}
          />
          {repo.language}
        </span>
      </div>
      <div className="flex flex-col items-end" style={{ flex: 1 }}>
        <span className="text-md flex items-center text-gray-600 mb-2">
          {repo.stargazers_count}
          <StarIcon className={`h-4 w-4 inline ml-2 text-${theme.color}-700`} />
        </span>
        <span className="text-md flex items-center text-gray-600">
          {repo.forks_count}
          <ArrowPathRoundedSquareIcon
            className={`h-4 w-4 inline ml-2 text-${theme.color}-700`}
          />
        </span>
      </div>
    </div>
  );
};
