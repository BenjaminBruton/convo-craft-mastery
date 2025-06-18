import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Subscribe = () => {
  const navigate = useNavigate();

  // Placeholder for Stripe integration
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>Upgrade to Premium</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            Unlock all scenarios, advanced feedback, and progress tracking with a premium subscription.
          </p>
          <Button
            className="w-full"
            size="lg"
            onClick={() => {
              // TODO: Integrate Stripe checkout here
              alert("Stripe integration coming soon!");
            }}
          >
            Subscribe with Stripe
          </Button>
          <Button
            className="w-full mt-4"
            variant="outline"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subscribe;