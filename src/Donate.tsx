import { Heart, CreditCard, Building2, Smartphone, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './components/figma/ui/card';
import { Button } from './components/figma/ui/button';
import { Input } from './components/figma/ui/input';
import { Label } from './components/figma/ui/label';
import { RadioGroup, RadioGroupItem } from './components/figma/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/figma/ui/tabs';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { useState } from 'react';

export function Donate() {
  const [selectedAmount, setSelectedAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');

  const donationAmounts = ['25', '50', '100', '250', '500', '1000'];

  const impactAreas = [
    {
      icon: '📚',
      title: 'Education & Books',
      description: 'Provide books and educational materials to expand minds and build confidence',
    },
    {
      icon: '🏃',
      title: 'Sports Programs',
      description: 'Support wheelchair sports events and athlete development programs',
    },
    {
      icon: '🛠️',
      title: 'Vocational Training',
      description: 'Fund training programs that lead to independence and employment',
    },
    {
      icon: '♿',
      title: 'Mobility Equipment',
      description: 'Provide wheelchairs and mobility devices to those in need',
    },
    {
      icon: '🏥',
      title: 'Health & Hygiene',
      description: 'Supply hygiene products and health education to communities',
    },
    {
      icon: '🏢',
      title: 'Center Development',
      description: 'Help build the Mills Star Foundation Center for comprehensive support',
    },
  ];

  const benefits = [
    'Tax-deductible donation receipt',
    'Regular updates on our programs',
    'Annual impact report',
    'Invitation to special events',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your generous donation! This is a demo - no actual payment has been processed.');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/90 z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1740572497508-e5d62c77f4bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVlbGNoYWlyJTIwc3BvcnRzJTIwY29tbXVuaXR5fGVufDF8fHx8MTc2MDY4NTYyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Donate to Mills Star Foundation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-white mb-4">Make a Difference</h1>
          <p className="text-xl">Your donation empowers the differently abled</p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-1 gap-8">
            {/* Main Donation Form */}
            <div className="md:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-6 w-6 text-red-500" />
                    Choose Your Donation Amount
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Amount Selection */}
                    <div>
                      <Label>Select Amount (USD)</Label>
                      <div className="grid grid-cols-1 gap-4 mt-4">
                        {donationAmounts.map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => {
                              setSelectedAmount(amount);
                              setCustomAmount('');
                            }}
                            className={`py-3 px-4 border-2 rounded-md transition-all ${
                              selectedAmount === amount && !customAmount
                                ? 'border-blue-600 bg-blue-50 text-blue-900'
                                : 'border-gray-300 hover:border-blue-400'
                            }`}
                          >
                            ${amount}
                          </button>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Input
                          type="number"
                          placeholder="Custom amount"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setSelectedAmount('');
                          }}
                          min="1"
                        />
                      </div>
                    </div>

                    {/* Donation Type */}
                    <div>
                      <Label>Donation Type</Label>
                      <RadioGroup defaultValue="one-time" className="mt-4">
                        <div className="flex items-center space-x-2 p-4 border-2 border-gray-300 rounded-md hover:border-blue-400 transition-all">
                          <RadioGroupItem value="one-time" id="one-time" />
                          <Label htmlFor="one-time" className="flex-1 cursor-pointer">
                            One-time donation
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border-2 border-gray-300 rounded-md hover:border-blue-400 transition-all">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly" className="flex-1 cursor-pointer">
                            Monthly recurring donation
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Payment Method Tabs */}
                    <div>
                      <Label>Payment Method</Label>
                      <Tabs defaultValue="bank" className="mt-4">
                        <TabsList className="grid w-full grid-cols-1">
                          <TabsTrigger value="card" disabled>
                            <CreditCard className="h-4 w-4 mr-2" />
                            Card
                          </TabsTrigger>
                          <TabsTrigger value="bank">
                            <Building2 className="h-4 w-4 mr-2" />
                            Bank
                          </TabsTrigger>
                          <TabsTrigger value="mobile" disabled>
                            <Smartphone className="h-4 w-4 mr-2" />
                            Mobile
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="card" className="space-y-4 mt-4">
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-2" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" className="mt-2" />
                            </div>
                            <div>
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" className="mt-2" />
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="bank" className="mt-4">
  <div className="space-y-4">
    <div className="rounded-lg border-2 border-blue-600 bg-blue-50 p-4">
      <h3 className="text-blue-900 text-lg font-bold mb-2">Bank Transfer Details</h3>
      <ul className="space-y-1 text-blue-900">
        <li><span className="font-semibold">Bank Name:</span> Navy Federal Credit Union Bank</li>
        <li><span className="font-semibold">Account Name:</span> Francis Mills</li>
        <li><span className="font-semibold">Account Number:</span> 7210325762</li>
        <li><span className="font-semibold">Routing Number:</span> 256074974</li>
      </ul>
    </div>
    <p className="text-sm text-gray-600">Please make a bank transfer using the details above. Card and PayPal are temporarily unavailable.</p>
  </div>
</TabsContent>
                        <TabsContent value="mobile" className="mt-4">
                          <p className="text-gray-600 mb-4">
                            Mobile payment options available for Ghana and Nigeria.
                          </p>
                          <div>
                            <Label htmlFor="phoneNumber">Mobile Number</Label>
                            <Input id="phoneNumber" placeholder="+233 XXX XXX XXX" className="mt-2" />
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-blue-900">Your Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" required className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" required className="mt-2" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input id="phone" type="tel" className="mt-2" />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                      Donate ${customAmount || selectedAmount || '0'} <Heart className="ml-2 h-5 w-5" />
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      This is a secure donation form. Your information is protected.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Donor Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Donor Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Other Ways to Help */}
              <Card>
                <CardHeader>
                  <CardTitle>Other Ways to Help</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Volunteer with Us
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Corporate Sponsorship
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Donate Equipment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-blue-900 mb-4">Where Your Donation Goes</h2>
            <p className="text-gray-700">
              Every dollar makes a difference in the lives of differently abled individuals
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
            {impactAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-2">{area.icon}</div>
                  <CardTitle className="text-lg">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Thank You Message */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-blue-900 mb-6">Thank You for Your Support</h2>
          <p className="text-gray-700 text-lg mb-4">
            Your generosity enables us to continue our mission of empowering the differently abled through education, training, and opportunity.
          </p>
          <p className="text-gray-700">
            Together, we can create a world where everyone is seen, valued, and empowered to reach their full potential.
          </p>
        </div>
      </section>
    </div>
  );
}
