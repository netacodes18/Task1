import { Request, Response } from 'express';
import Student from '../models/Student';

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const student = new Student({
      ...req.body,
      applicationDate: req.body.applicationDate ? new Date(req.body.applicationDate) : new Date(),
    });
    await student.save();
    res.status(201).json(student);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find().populate('preferences').populate('allocatedCourse');
    res.json(students);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
