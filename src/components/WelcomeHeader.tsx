
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, User, Crown } from 'lucide-react';

interface WelcomeHeaderProps {
  isTrialUser: boolean;
}

const WelcomeHeader = ({ isTrialUser }: WelcomeHeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PersuadeAI</h1>
              <p className="text-sm text-gray-500">Communication Skills Training</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {isTrialUser && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Trial
              </Badge>
            )}
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </Button>
            {isTrialUser && (
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Upgrade
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default WelcomeHeader;
