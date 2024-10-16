import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  { name: "Basic", price: "$29", features: ["2 live classes per week", "Access to recorded sessions", "Email support"] },
  { name: "Pro", price: "$49", features: ["4 live classes per week", "Unlimited access to recorded sessions", "Priority email support", "1-on-1 session per month"] },
  { name: "Elite", price: "$99", features: ["Unlimited live classes", "Unlimited access to recorded sessions", "24/7 support", "Weekly 1-on-1 sessions", "Personalized workout plan"] },
]

export default function PricingPlans() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription className="text-3xl font-bold">{plan.price}/month</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc list-inside">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Choose Plan</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}