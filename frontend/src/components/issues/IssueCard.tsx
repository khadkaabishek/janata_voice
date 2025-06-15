import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Clock } from 'lucide-react';
import { Issue } from '../../types';
import Card, { CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import { ISSUE_STATUSES, ISSUE_CATEGORIES } from '../../data/mockData';
import { formatDate } from '../../utils/dateFormatter';

type IssueCardProps = {
  issue: Issue;
  userId: string; // You can keep this if you want, but not used for local voting
  onClick?: () => void;
};

const IssueCard: React.FC<IssueCardProps> = ({ issue, userId, onClick }) => {
  const { status, category } = issue;
  const statusConfig = ISSUE_STATUSES[status];
  const categoryConfig = ISSUE_CATEGORIES[category];

  // State to track votes count and whether current user has voted (locally only)
  const [votes, setVotes] = useState(issue.votes || 0);
  const [hasVoted, setHasVoted] = useState(false);

  const getStatusVariant = () => {
    switch (statusConfig?.color) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'primary-500':
        return 'primary';
      default:
        return 'danger';
    }
  };

  // Local toggle vote handler — no backend calls
  const handleVote = () => {
    if (hasVoted) {
      setVotes(votes - 1);
      setHasVoted(false);
    } else {
      setVotes(votes + 1);
      setHasVoted(true);
    }
  };

  return (
    <Card onClick={onClick} hoverable className="h-full">
      <div className="relative h-40 overflow-hidden">
        <img src={`http://localhost:5001${issue.images[0]}`} alt="Issue Image" />
        <div className="absolute top-2 right-2 flex space-x-2">
          <Badge variant={getStatusVariant()}>
            {statusConfig?.label || 'Unknown'}
          </Badge>
        </div>
      </div>

      <CardContent>
        <div className="flex items-start justify-between mb-2">
          <Badge variant="default" className="bg-gray-100">
            Ward {issue.wardNumber}
          </Badge>
          {categoryConfig ? (
            <Badge variant="primary">{categoryConfig.label}</Badge>
          ) : (
            <Badge variant="default">Unknown Category</Badge>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {issue.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {issue.description}
        </p>

        <div className="flex items-center text-sm text-gray-500">
          <Clock size={14} className="mr-1" />
          <span>{formatDate(issue.reportedAt)}</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            className={`flex items-center ${
              hasVoted ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleVote();
            }}
            aria-pressed={hasVoted}
            aria-label="Like Issue"
          >
            <ThumbsUp size={16} className="mr-1" />
            <span>{votes}</span>
          </button>

          <div className="flex items-center text-gray-600">
            <MessageSquare size={16} className="mr-1" />
            <span>12</span>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          {issue.isAnonymous ? 'Anonymous' : `By ${issue.submittedBY}`}
        </div>
      </CardFooter>
    </Card>
  );
};

export default IssueCard;
