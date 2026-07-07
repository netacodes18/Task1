import { Request, Response } from 'express';
import Student from '../models/Student';
import Course from '../models/Course';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalStudents = await Student.countDocuments();
    const allocatedStudents = await Student.countDocuments({ isAllocated: true });
    const waitlistedStudents = await Student.countDocuments({ isWaitlisted: true });
    const unallocatedStudents = totalStudents - allocatedStudents - waitlistedStudents;
    
    const courses = await Course.find();
    const totalSeats = courses.reduce((acc, c) => acc + c.totalSeats, 0);

    const categoryAllocations = await Student.aggregate([
      { $match: { isAllocated: true } },
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    res.json({
      totalStudents,
      allocatedStudents,
      waitlistedStudents,
      unallocatedStudents,
      totalSeats,
      categoryAllocations
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
