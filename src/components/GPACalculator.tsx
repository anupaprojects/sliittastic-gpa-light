
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const grades = [
  { grade: 'A+', gpa: 4.0, range: '90-100' },
  { grade: 'A', gpa: 4.0, range: '80-89' },
  { grade: 'A-', gpa: 3.7, range: '75-79' },
  { grade: 'B+', gpa: 3.3, range: '70-74' },
  { grade: 'B', gpa: 3.0, range: '65-69' },
  { grade: 'B-', gpa: 2.7, range: '60-64' },
  { grade: 'C+', gpa: 2.3, range: '55-59' },
  { grade: 'C', gpa: 2.0, range: '45-54' },
  { grade: 'C-', gpa: 1.7, range: '40-44' },
  { grade: 'D+', gpa: 1.3, range: '35-39' },
  { grade: 'D', gpa: 1.0, range: '30-34' },
  { grade: 'E', gpa: 0.0, range: '0-29' },
];

interface Course {
  name: string;
  credits: number;
  grade: string;
}

const GPACalculator = () => {
  const [courses, setCourses] = useState<Course[]>([{ name: '', credits: 3, grade: 'A' }]);
  const [gpa, setGPA] = useState<number | null>(null);

  const addCourse = () => {
    setCourses([...courses, { name: '', credits: 3, grade: 'A' }]);
  };

  const updateCourse = (index: number, field: keyof Course, value: string | number) => {
    const newCourses = [...courses];
    newCourses[index] = { ...newCourses[index], [field]: value };
    setCourses(newCourses);
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const gradeInfo = grades.find((g) => g.grade === course.grade);
      if (gradeInfo) {
        totalPoints += gradeInfo.gpa * course.credits;
        totalCredits += course.credits;
      }
    });

    setGPA(totalCredits > 0 ? totalPoints / totalCredits : 0);
  };

  return (
    <div className="min-h-screen p-8 gradient-bg relative overflow-hidden">
      <div className="absolute top-40 left-20 ambient-light" />
      <div className="absolute bottom-40 right-20 ambient-light" />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 text-accent">
            <Calculator className="inline-block mr-2 mb-1" />
            SLIIT GPA Calculator
          </h1>
          <p className="text-accent/60">Calculate your GPA with ease</p>
        </div>

        <div className="glass-card rounded-2xl p-8 mb-8 animate-scale-in">
          {courses.map((course, index) => (
            <div key={index} className="flex gap-4 mb-4 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <input
                type="text"
                placeholder="Course Name"
                value={course.name}
                onChange={(e) => updateCourse(index, 'name', e.target.value)}
                className="flex-1 p-2 rounded-lg bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <select
                value={course.credits}
                onChange={(e) => updateCourse(index, 'credits', parseInt(e.target.value))}
                className="w-24 p-2 rounded-lg bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {[1, 2, 3, 4].map((credit) => (
                  <option key={credit} value={credit}>{credit}</option>
                ))}
              </select>
              <select
                value={course.grade}
                onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                className="w-24 p-2 rounded-lg bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {grades.map((g) => (
                  <option key={g.grade} value={g.grade}>{g.grade}</option>
                ))}
              </select>
            </div>
          ))}

          <div className="flex gap-4 mt-6">
            <button
              onClick={addCourse}
              className="px-6 py-2 rounded-lg bg-white/50 hover:bg-white/70 transition-colors border border-white/30"
            >
              Add Course
            </button>
            <button
              onClick={calculateGPA}
              className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Calculate GPA
            </button>
          </div>
        </div>

        {gpa !== null && (
          <div className="glass-card rounded-2xl p-8 text-center animate-scale-in">
            <h2 className="text-2xl font-semibold mb-4">Your GPA</h2>
            <div className="text-6xl font-bold text-primary glow">{gpa.toFixed(2)}</div>
          </div>
        )}

        <div className="glass-card rounded-2xl p-8 mt-8 animate-fade-in">
          <h3 className="text-xl font-semibold mb-4">Grading Scale</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {grades.map((grade) => (
              <div key={grade.grade} className="p-4 rounded-lg bg-white/50 border border-white/30">
                <div className="text-lg font-bold text-primary">{grade.grade}</div>
                <div className="text-sm text-accent/60">GPA: {grade.gpa}</div>
                <div className="text-sm text-accent/60">Range: {grade.range}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;
