"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Mood = {
  id: string
  date: string
  value: number
  notes?: string
}

export type MoodBoard = {
  id: string
  name: string
  items: any[]
  createdAt: string
  updatedAt: string
}

export type JournalEntry = {
  id: string
  date: string
  content: string
  moodId?: string
}

interface MoodStoreState {
  moods: Mood[]
  moodBoards: MoodBoard[]
  journalEntries: JournalEntry[]
  addMood: (mood: Mood) => void
  updateMood: (id: string, mood: Partial<Mood>) => void
  deleteMood: (id: string) => void
  addMoodBoard: (moodBoard: MoodBoard) => void
  updateMoodBoard: (id: string, moodBoard: Partial<MoodBoard>) => void
  deleteMoodBoard: (id: string) => void
  addJournalEntry: (entry: JournalEntry) => void
  updateJournalEntry: (id: string, entry: Partial<JournalEntry>) => void
  deleteJournalEntry: (id: string) => void
  loadMoods: () => void
}

export const useMoodStore = create<MoodStoreState>()(
  persist(
    (set, get) => ({
      moods: [],
      moodBoards: [],
      journalEntries: [],

      addMood: (mood) => {
        set((state) => ({
          moods: [...state.moods, mood],
        }))
      },

      updateMood: (id, updatedMood) => {
        set((state) => ({
          moods: state.moods.map((mood) => (mood.id === id ? { ...mood, ...updatedMood } : mood)),
        }))
      },

      deleteMood: (id) => {
        set((state) => ({
          moods: state.moods.filter((mood) => mood.id !== id),
        }))
      },

      addMoodBoard: (moodBoard) => {
        set((state) => ({
          moodBoards: [...state.moodBoards, moodBoard],
        }))
      },

      updateMoodBoard: (id, updatedMoodBoard) => {
        set((state) => ({
          moodBoards: state.moodBoards.map((moodBoard) =>
            moodBoard.id === id ? { ...moodBoard, ...updatedMoodBoard } : moodBoard,
          ),
        }))
      },

      deleteMoodBoard: (id) => {
        set((state) => ({
          moodBoards: state.moodBoards.filter((moodBoard) => moodBoard.id !== id),
        }))
      },

      addJournalEntry: (entry) => {
        set((state) => ({
          journalEntries: [...state.journalEntries, entry],
        }))
      },

      updateJournalEntry: (id, updatedEntry) => {
        set((state) => ({
          journalEntries: state.journalEntries.map((entry) =>
            entry.id === id ? { ...entry, ...updatedEntry } : entry,
          ),
        }))
      },

      deleteJournalEntry: (id) => {
        set((state) => ({
          journalEntries: state.journalEntries.filter((entry) => entry.id !== id),
        }))
      },

      loadMoods: () => {
        // This function is needed for client components to trigger loading
        // The actual loading happens via the persist middleware
      },
    }),
    {
      name: "moodmuse-storage",
    },
  ),
)
