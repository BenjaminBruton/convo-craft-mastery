
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, TrendingUp, Briefcase, Target, Crown } from 'lucide-react';
import ScenarioChat from '@/components/ScenarioChat';
import WelcomeHeader from '@/components/WelcomeHeader';

const scenarios = [
  {
    id: 'negotiation',
    title: 'Negotiation Skills',
    description: 'Master the art of win-win negotiations',
    icon: MessageSquare,
    color: 'bg-blue-500',
    isPremium: false
  },
  {
    id: 'sales',
    title: 'Sales Mastery',
    description: 'Close deals and overcome objections',
    icon: TrendingUp,
    color: 'bg-green-500',
    isPremium: false
  },
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'Get stakeholder buy-in and manage resources',
    icon: Briefcase,
    color: 'bg-purple-500',
    isPremium: true
  },
  {
    id: 'marketing',
    title: 'Marketing & Advertising',
    description: 'Craft compelling campaigns and messaging',
    icon: Target,
    color: 'bg-orange-500',
    isPremium: true
  },
  {
    id: 'leadership',
    title: 'Leadership Communication',
    description: 'Inspire teams and drive change',
    icon: Users,
    color: 'bg-indigo-500',
    isPremium: true
  },
  {
    id: 'conflict-resolution',
    title: 'Conflict Resolution',
    description: 'Navigate difficult conversations',
    icon: MessageSquare,
    color: 'bg-red-500',
    isPremium: true
  }
];

const Index = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isTrialUser, setIsTrialUser] = useState(true); // This would come from auth context

  const handleScenarioSelect = (scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario?.isPremium && isTrialUser) {
      // Show upgrade prompt
      alert('This scenario requires a premium subscription. Upgrade to continue!');
      return;
    }
    setSelectedScenario(scenarioId);
  };

  const handleBackToScenarios = () => {
    setSelectedScenario(null);
  };

  if (selectedScenario) {
    const scenario = scenarios.find(s => s.id === selectedScenario)!;
    return <ScenarioChat scenario={scenario} onBack={handleBackToScenarios} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <WelcomeHeader isTrialUser={isTrialUser} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Master the Art of Persuasion
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Practice real-world communication scenarios and get AI-powered feedback to improve your skills
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <Badge variant="secondary" className="text-sm">
                {isTrialUser ? 'Free Trial' : 'Premium Access'}
              </Badge>
              <span className="text-sm text-gray-500">
                {isTrialUser ? '2 free scenarios remaining' : 'Unlimited access'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario) => {
              const IconComponent = scenario.icon;
              const isLocked = scenario.isPremium && isTrialUser;
              
              return (
                <Card 
                  key={scenario.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    isLocked ? 'opacity-70' : ''
                  }`}
                  onClick={() => handleScenarioSelect(scenario.id)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full ${scenario.color} flex items-center justify-center mx-auto mb-4 relative`}>
                      <IconComponent className="w-8 h-8 text-white" />
                      {isLocked && (
                        <div className="absolute -top-2 -right-2">
                          <Crown className="w-6 h-6 text-yellow-500 fill-current" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg font-semibold">
                      {scenario.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {scenario.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button 
                      className="w-full" 
                      variant={isLocked ? "outline" : "default"}
                    >
                      {isLocked ? 'Upgrade to Access' : 'Start Scenario'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {isTrialUser && (
            <div className="mt-12 text-center">
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Ready to unlock your full potential?</h3>
                  <p className="text-lg mb-6 opacity-90">
                    Get unlimited access to all scenarios, advanced feedback, and progress tracking
                  </p>
                  <Button size="lg" variant="secondary" className="text-gray-900">
                    Upgrade to Premium
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
