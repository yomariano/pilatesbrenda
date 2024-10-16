import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, Heart, Brain, Users } from 'lucide-react'

const benefits = [
  { title: "Improved Strength", description: "Build lean muscle and increase overall strength", icon: Dumbbell },
  { title: "Better Flexibility", description: "Enhance your range of motion and reduce stiffness", icon: Heart },
  { title: "Mental Clarity", description: "Reduce stress and improve focus through mindful movement", icon: Brain },
  { title: "Community Support", description: "Join a supportive community of like-minded individuals", icon: Users },
]

export default function Benefits() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Benefits of Pilates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {<benefit.icon className="mr-2" />}
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}