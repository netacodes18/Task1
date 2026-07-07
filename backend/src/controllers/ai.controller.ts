import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import Student from '../models/Student';
import Course from '../models/Course';

export const handleAiChat = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key is not configured" });
    }

    const students = await Student.find().populate('allocatedCourse').populate('preferences');
    const courses = await Course.find();

    const dataContext = {
      students: students.map(s => ({
        name: s.name,
        marks: s.marks,
        category: s.category,
        isAllocated: s.isAllocated,
        preferenceMet: s.preferenceMet,
        allocatedCourse: (s.allocatedCourse as any)?.name || null,
        preferences: s.preferences.map((p: any) => p.name || p.toString())
      })),
      courses: courses.map(c => ({
        name: c.name,
        totalSeats: c.totalSeats,
        generalSeats: c.generalSeats,
        obcSeats: c.obcSeats,
        scSeats: c.scSeats,
        stSeats: c.stSeats
      }))
    };

    const prompt = `
    You are an AI assistant for a University Course Allocation System.
    The user is asking: "${query}"
    
    Here is the current database context (JSON):
    ${JSON.stringify(dataContext)}
    
    Please answer the user's question clearly and concisely based ONLY on the provided data context.
    `;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    let errorMessage = error.message;
    try {
      const parsed = JSON.parse(error.message);
      if (parsed.error && parsed.error.message) {
        errorMessage = parsed.error.message;
      }
    } catch (e) {
      // error.message wasn't JSON, leave it as is
    }
    res.status(500).json({ error: errorMessage });
  }
};
