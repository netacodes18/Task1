import { Request, Response } from 'express';
import Course from '../models/Course';

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
