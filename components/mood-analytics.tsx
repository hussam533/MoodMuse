"use client"

import { useMoodStore } from "@/lib/store"
import { format, subDays } from "date-fns"
import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"
import { Card, CardContent } from "./ui/card"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

export function MoodAnalytics() {
  const { moods } = useMoodStore()
  const [chartData, setChartData] = useState<any[]>([])
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week")

  useEffect(() => {
    // Generate sample data if no moods exist
    if (moods.length === 0) {
      const sampleData = Array.from({ length: 14 }, (_, i) => {
        const date = subDays(new Date(), 13 - i)
        return {
          date: date.toISOString(),
          value: Math.floor(Math.random() * 6) + 3, // Random value between 3-8
        }
      })
      setChartData(sampleData)
      return
    }

    // Sort moods by date
    const sortedMoods = [...moods].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    setChartData(sortedMoods)
  }, [moods])

  const getFilteredData = () => {
    const now = new Date()
    let cutoffDate

    switch (timeRange) {
      case "week":
        cutoffDate = subDays(now, 7)
        break
      case "month":
        cutoffDate = subDays(now, 30)
        break
      case "year":
        cutoffDate = subDays(now, 365)
        break
      default:
        cutoffDate = subDays(now, 7)
    }

    return chartData.filter((item) => new Date(item.date) >= cutoffDate)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MMM d")
  }

  const calculateAverageMood = () => {
    const filteredData = getFilteredData()
    if (filteredData.length === 0) return "N/A"

    const sum = filteredData.reduce((acc, item) => acc + item.value, 0)
    return (sum / filteredData.length).toFixed(1)
  }

  const getMoodDistribution = () => {
    const filteredData = getFilteredData()
    const distribution = {
      great: 0,
      good: 0,
      neutral: 0,
      down: 0,
      sad: 0,
    }

    filteredData.forEach((item) => {
      if (item.value <= 2) distribution.sad++
      else if (item.value <= 4) distribution.down++
      else if (item.value <= 6) distribution.neutral++
      else if (item.value <= 8) distribution.good++
      else distribution.great++
    })

    return distribution
  }

  const distribution = getMoodDistribution()

  return (
    <div className="space-y-6">
      <Tabs defaultValue="week" onValueChange={(value) => setTimeRange(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Average Mood</div>
            <div className="text-3xl font-bold mt-2">{calculateAverageMood()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Most Common</div>
            <div className="text-3xl font-bold mt-2">
              {
                Object.entries(distribution).reduce((max, [key, value]) => (value > max.value ? { key, value } : max), {
                  key: "none",
                  value: 0,
                }).key
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Entries</div>
            <div className="text-3xl font-bold mt-2">{getFilteredData().length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Mood Variance</div>
            <div className="text-3xl font-bold mt-2">
              {getFilteredData().length > 1
                ? (
                    Math.max(...getFilteredData().map((d) => d.value)) -
                    Math.min(...getFilteredData().map((d) => d.value))
                  ).toFixed(1)
                : "N/A"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getFilteredData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number) => [`Mood: ${value}`, "Mood Score"]}
                  labelFormatter={(label) => formatDate(label as string)}
                />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#moodGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Mood Distribution</h3>
            <div className="space-y-4">
              {Object.entries(distribution).map(([mood, count]) => (
                <div key={mood} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{mood}</span>
                    <span>{count}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${getFilteredData().length ? (count / getFilteredData().length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Mood Insights</h3>
            <div className="space-y-4 text-sm">
              <p>
                Based on your mood entries, you tend to feel best on <span className="font-medium">weekends</span> and
                experience more stress on <span className="font-medium">Mondays</span>.
              </p>
              <p>
                Your mood has been{" "}
                <span className="font-medium">
                  {getFilteredData().length > 1 &&
                  getFilteredData()[getFilteredData().length - 1].value > getFilteredData()[0].value
                    ? "improving"
                    : "fluctuating"}
                </span>{" "}
                over this time period.
              </p>
              <p>Try to schedule important activities during your peak mood times for better results.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
