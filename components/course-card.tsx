"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface CourseCardProps {
  level: string
  title: string
  description: string
}

export function CourseCard({ level, title, description }: CourseCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="bg-[#faf7f2]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-red-500">{level}</CardTitle>
          <CardDescription className="text-xl font-bold text-gray-800">{title}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{description}</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white">了解更多</Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

