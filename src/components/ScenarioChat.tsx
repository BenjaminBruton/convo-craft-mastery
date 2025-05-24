
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send, Bot, User, Lightbulb, Target } from 'lucide-react';
import FeedbackPanel from '@/components/FeedbackPanel';

interface Message {
  id: string;
  type: 'ai' | 'user' | 'feedback';
  content: string;
  timestamp: Date;
  feedback?: {
    rating: number;
    improvements: string[];
    analysis: string;
  };
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  isPremium: boolean;
}

interface ScenarioChatProps {
  scenario: Scenario;
  onBack: () => void;
}

const scenarioPrompts = {
  'negotiation': "You're negotiating a salary increase with your manager. They just said: 'I understand you'd like a raise, but the budget is tight this year. We can revisit this next quarter.'",
  'sales': "You're trying to close a deal with a potential client. They just said: 'Your solution looks good, but your competitor is offering the same thing for 30% less. Why should we choose you?'",
  'project-management': "You're a project manager trying to get additional resources from stakeholders. The stakeholder just said: 'I don't think you need any more resources. You should be able to move forward successfully with what you have.'",
  'marketing': "You're pitching a new marketing campaign to the executive team. The CEO just said: 'This campaign seems too risky and expensive. How do we know it will generate ROI?'",
  'leadership': "You're leading a team meeting about a major organizational change. A team member just said: 'This change seems unnecessary and will just create more work for everyone.'",
  'conflict-resolution': "You're mediating a conflict between two team members. One just said: 'They never listen to my ideas and always shoot them down in meetings.'"
};

const ScenarioChat = ({ scenario, onBack }: ScenarioChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Initialize with scenario prompt
    const initialMessage: Message = {
      id: '1',
      type: 'ai',
      content: scenarioPrompts[scenario.id as keyof typeof scenarioPrompts] || "Let's begin this scenario.",
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, [scenario.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): { response: string; feedback: any } => {
    // Simulated AI response based on scenario
    const responses = {
      'project-management': {
        response: "I see your point, but let me share some data that might change your perspective. Our current team velocity has decreased by 25% over the last sprint, and we're at risk of missing our Q4 deadline. What specific concerns do you have about additional resources?",
        feedback: {
          rating: 7,
          improvements: [
            "Good use of data to support your argument",
            "Consider asking more open-ended questions to understand their concerns",
            "You could have acknowledged their perspective more before presenting your case"
          ],
          analysis: "You effectively used data to make your case stronger. The follow-up question shows you're listening, but you could improve by showing more empathy for their budget constraints first."
        }
      }
    };

    // Default response for other scenarios
    return responses[scenario.id as keyof typeof responses] || {
      response: "That's an interesting perspective. Let me think about how to address your concerns...",
      feedback: {
        rating: 6,
        improvements: [
          "Try to be more specific in your response",
          "Use concrete examples to support your points",
          "Ask clarifying questions to better understand their position"
        ],
        analysis: "Your response shows you're thinking, but could be more decisive and specific."
      }
    };
  };

  const handleSendMessage = async () => {
    if (!currentInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const { response, feedback } = generateAIResponse(currentInput);
      
      const feedbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'feedback',
        content: 'Analysis of your response:',
        timestamp: new Date(),
        feedback
      };

      const aiMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, feedbackMessage, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Scenarios
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${scenario.color} flex items-center justify-center`}>
                <scenario.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{scenario.title}</h2>
                <p className="text-sm text-gray-500">Practice Session</p>
              </div>
            </div>
          </div>
          <Badge variant="outline">In Progress</Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 container mx-auto p-4 max-w-4xl">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id}>
              {message.type === 'ai' && (
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 p-2 rounded-full">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <Card className="flex-1 max-w-3xl">
                    <CardContent className="p-4">
                      <p className="text-gray-900">{message.content}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {message.type === 'user' && (
                <div className="flex items-start gap-3 justify-end">
                  <Card className="flex-1 max-w-3xl bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <p className="text-gray-900">{message.content}</p>
                      <p className="text-xs text-gray-500 mt-2 text-right">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </CardContent>
                  </Card>
                  <div className="bg-gray-600 p-2 rounded-full">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}

              {message.type === 'feedback' && message.feedback && (
                <FeedbackPanel feedback={message.feedback} />
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 p-2 rounded-full">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <Card className="flex-1 max-w-3xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                    <span className="text-sm text-gray-500">Analyzing your response...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-4">
            <Textarea
              placeholder="Type your response here..."
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 min-h-[80px] max-h-32 resize-none"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!currentInput.trim() || isLoading}
              size="lg"
              className="px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScenarioChat;
