
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Target, TrendingUp, Star } from 'lucide-react';

interface FeedbackPanelProps {
  feedback: {
    rating: number;
    improvements: string[];
    analysis: string;
  };
}

const FeedbackPanel = ({ feedback }: FeedbackPanelProps) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-600 bg-green-100';
    if (rating >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRatingText = (rating: number) => {
    if (rating >= 8) return 'Excellent';
    if (rating >= 6) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-purple-600" />
            AI Feedback & Analysis
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={getRatingColor(feedback.rating)}>
              <Star className="w-3 h-3 mr-1" />
              {feedback.rating}/10 - {getRatingText(feedback.rating)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-600" />
            Analysis
          </h4>
          <p className="text-gray-700 text-sm leading-relaxed">
            {feedback.analysis}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            Key Improvements
          </h4>
          <ul className="space-y-2">
            {feedback.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/50 rounded-lg p-3 border border-purple-200">
          <p className="text-xs text-gray-600 italic">
            💡 Pro tip: Great communicators always acknowledge the other person's perspective before presenting their own case. This builds trust and opens dialogue.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackPanel;
