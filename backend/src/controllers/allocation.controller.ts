import { Request, Response } from 'express';
import Student from '../models/Student';
import Course from '../models/Course';

export const runAllocation = async (req: Request, res: Response) => {
  try {
    await Student.updateMany({}, { 
      isAllocated: false, 
      allocatedCourse: null, 
      preferenceMet: null,
      isWaitlisted: false,
      waitlistCourse: null,
      waitlistNumber: null
    });
    
    const students = await Student.find().sort({ marks: -1, applicationDate: 1 });
    const courses = await Course.find();
    
    const courseSeats: Record<string, any> = {};
    courses.forEach(c => {
      courseSeats[c._id.toString()] = {
        General: c.generalSeats,
        OBC: c.obcSeats,
        SC: c.scSeats,
        ST: c.stSeats
      };
    });

    const courseWaitlists: Record<string, number> = {};

    let allocatedCount = 0;

    for (const student of students) {
      if (student.isAllocated) continue;

      for (let i = 0; i < student.preferences.length; i++) {
        const courseIdStr = student.preferences[i].toString();
        const seats = courseSeats[courseIdStr];

        if (seats && seats[student.category] > 0) {
          seats[student.category] -= 1;
          student.isAllocated = true;
          student.allocatedCourse = student.preferences[i];
          student.preferenceMet = i + 1;
          await student.save();
          allocatedCount++;
          break;
        }
      }

      if (!student.isAllocated && student.preferences.length > 0) {
        const firstPrefStr = student.preferences[0].toString();
        courseWaitlists[firstPrefStr] = (courseWaitlists[firstPrefStr] || 0) + 1;
        
        student.isWaitlisted = true;
        student.waitlistCourse = student.preferences[0];
        student.waitlistNumber = courseWaitlists[firstPrefStr];
        await student.save();
      }
    }

    res.json({ message: 'Allocation complete', allocatedCount });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
