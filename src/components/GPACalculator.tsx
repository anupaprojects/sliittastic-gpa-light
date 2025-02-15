import React, { useState } from 'react';
import { Calculator, Download, FileText, Award } from 'lucide-react';

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

  const downloadResults = () => {
    if (!gpa) return;

    let content = "SLIIT GPA Calculation Results\n\n";
    content += "Courses:\n";
    courses.forEach((course, index) => {
      content += `${index + 1}. ${course.name || 'Unnamed Course'} - ${course.credits} credits - Grade: ${course.grade}\n`;
    });
    content += `\nFinal GPA: ${gpa.toFixed(2)}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gpa-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-emerald-500';
    if (gpa >= 3.0) return 'text-blue-500';
    if (gpa >= 2.0) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPerformanceMessage = (gpa: number) => {
    if (gpa >= 3.7) return "Dean's List - Outstanding Achievement!";
    if (gpa >= 3.0) return "Excellent Performance!";
    if (gpa >= 2.0) return "Good effort! Keep working to improve further.";
    return "Below passing grade. Seek academic support to improve.";
  };

  const getPerformanceColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-emerald-500';
    if (gpa >= 3.0) return 'text-blue-500';
    if (gpa >= 2.0) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen px-4 py-12 md:py-16 gradient-bg relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 ambient-light opacity-75" />
      <div className="absolute bottom-1/4 right-1/4 ambient-light opacity-75" />
      
      <div className="container max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-accent flex items-center justify-center gap-3">
            <Calculator className="w-8 h-8 md:w-10 md:h-10" />
            <span>SLIIT GPA Calculator</span>
          </h1>
          <p className="text-accent/60 text-lg">Calculate your GPA with ease</p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 animate-scale-in">
          {courses.map((course, index) => (
            <div 
              key={index} 
              className="flex flex-col sm:flex-row gap-3 mb-4 animate-slide-up" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <input
                type="text"
                placeholder="Course Name"
                value={course.name}
                onChange={(e) => updateCourse(index, 'name', e.target.value)}
                className="flex-1 p-3 rounded-xl bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <select
                value={course.credits}
                onChange={(e) => updateCourse(index, 'credits', parseInt(e.target.value))}
                className="sm:w-32 p-3 rounded-xl bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                {[1, 2, 3, 4].map((credit) => (
                  <option key={credit} value={credit}>{credit} Credits</option>
                ))}
              </select>
              <select
                value={course.grade}
                onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                className="sm:w-24 p-3 rounded-xl bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                {grades.map((g) => (
                  <option key={g.grade} value={g.grade}>{g.grade}</option>
                ))}
              </select>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={addCourse}
              className="px-6 py-3 rounded-xl bg-white/50 hover:bg-white/70 transition-all border border-white/30 text-accent font-medium flex items-center justify-center gap-2"
            >
              Add Course
            </button>
            <button
              onClick={calculateGPA}
              className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all font-medium flex items-center justify-center gap-2"
            >
              Calculate GPA
            </button>
          </div>
        </div>

        {gpa !== null && (
          <div className="space-y-6 animate-scale-in">
            <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl" />
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  Your GPA Summary
                </h2>
                <div className={`text-8xl font-bold ${getPerformanceColor(gpa)} glow py-6 rounded-2xl`}>
                  {gpa.toFixed(2)}
                </div>
                <p className={`text-lg font-medium mt-4 ${getPerformanceColor(gpa)}`}>
                  {getPerformanceMessage(gpa)}
                </p>
                <p className="text-accent/60 mt-2">
                  Based on {courses.length} course{courses.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 text-center">
              <button
                onClick={downloadResults}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all font-medium mx-auto"
              >
                <FileText className="w-5 h-5" />
                Download Results
                <Download className="w-4 h-4" />
              </button>
              <p className="text-sm text-accent/60 mt-3">
                Download a detailed report of your GPA calculation
              </p>
            </div>
          </div>
        )}

        <div className="glass-card rounded-2xl p-6 md:p-8 mt-8 animate-fade-in">
          <h3 className="text-2xl font-semibold mb-6 text-center">Grading Scale</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {grades.map((grade) => (
              <div 
                key={grade.grade} 
                className="p-4 rounded-xl bg-white/50 border border-white/30 hover:bg-white/60 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="text-xl font-bold text-primary mb-1">{grade.grade}</div>
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
