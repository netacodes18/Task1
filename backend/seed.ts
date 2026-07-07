import mongoose from 'mongoose';
import Course from './src/models/Course';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/allocation_system';

const seedCourses = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    const courses = [
      {
        name: 'Computer Science (B.Tech)',
        totalSeats: 60,
        generalSeats: 30,
        obcSeats: 16,
        scSeats: 9,
        stSeats: 5
      },
      {
        name: 'Electrical Engineering (B.Tech)',
        totalSeats: 40,
        generalSeats: 20,
        obcSeats: 11,
        scSeats: 6,
        stSeats: 3
      },
      {
        name: 'Mechanical Engineering (B.Tech)',
        totalSeats: 50,
        generalSeats: 25,
        obcSeats: 13,
        scSeats: 8,
        stSeats: 4
      },
      {
        name: 'Electronics & Communication (B.Tech)',
        totalSeats: 45,
        generalSeats: 22,
        obcSeats: 12,
        scSeats: 7,
        stSeats: 4
      },
      {
        name: 'Information Technology (B.Tech)',
        totalSeats: 55,
        generalSeats: 28,
        obcSeats: 15,
        scSeats: 8,
        stSeats: 4
      },
      {
        name: 'Civil Engineering (B.Tech)',
        totalSeats: 30,
        generalSeats: 15,
        obcSeats: 8,
        scSeats: 5,
        stSeats: 2
      },
      {
        name: 'Chemical Engineering (B.Tech)',
        totalSeats: 25,
        generalSeats: 13,
        obcSeats: 7,
        scSeats: 3,
        stSeats: 2
      },
      {
        name: 'Aerospace Engineering (B.Tech)',
        totalSeats: 20,
        generalSeats: 10,
        obcSeats: 5,
        scSeats: 3,
        stSeats: 2
      }
    ];

    await Course.insertMany(courses);
    console.log('Seeded initial courses');
    process.exit();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seedCourses();
