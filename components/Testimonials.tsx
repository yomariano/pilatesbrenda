import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  { name: "Sarah L.", quote: "Pilates has transformed my body and mind. I feel stronger and more confident than ever!", avatar: "SL" },
  { name: "Mike R.", quote: "As a former athlete, Pilates has helped me maintain my fitness and flexibility. Highly recommended!", avatar: "MR" },
  { name: "Emily T.", quote: "The online classes are so convenient, and the instructors are top-notch. I love this studio!", avatar: "ET" },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Avatar className="mr-2">
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  {testimonial.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}