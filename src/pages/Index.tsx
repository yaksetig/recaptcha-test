import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [username, setUsername] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isVerified) {
      toast({
        variant: "destructive",
        title: "Verification required",
        description: "Please complete the reCAPTCHA verification",
      });
      return;
    }

    if (!username) {
      toast({
        variant: "destructive",
        title: "Username required",
        description: "Please enter a username",
      });
      return;
    }

    // Here you would typically make an API call to register the user
    toast({
      title: "Registration successful!",
      description: `Welcome, ${username}!`,
    });
  };

  const handleRecaptchaChange = (value: string | null) => {
    setIsVerified(!!value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="mt-2 text-gray-600">Please enter a username to register</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />

            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "your-site-key"}
                onChange={handleRecaptchaChange}
              />
            </div>

            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;