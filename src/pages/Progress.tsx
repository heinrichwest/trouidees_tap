// src/pages/Progress.tsx
import { useState } from 'react';
import "../styles/Progress.css";

interface ProgressProps {
  onBack?: () => void;
}

// Standalone Course type
interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  thumbnail: string;
}

export default function Progress({ onBack }: ProgressProps) {
  // Sample course data (replace with real data later)
  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'Troubeplanning Grondbeginsels',
      description: 'Leer die basiese beginsels van troubeplanning, van datumkeuse tot begroting.',
      category: 'Beplanning',
      progress: 0,
      totalLessons: 12,
      completedLessons: 0,
      thumbnail: '📅'
    },
    {
      id: '2',
      title: 'Venue Keuse en Beplanning',
      description: 'Ontdek hoe om die perfekte venue te kies en te beplan vir jou spesiale dag.',
      category: 'Venue',
      progress: 25,
      totalLessons: 8,
      completedLessons: 2,
      thumbnail: '🏛️'
    },
    {
      id: '3',
      title: 'Katering en Menu Beplanning',
      description: 'Leer hoe om die regte katering te kies en \'n perfekte menu saam te stel.',
      category: 'Katering',
      progress: 100,
      totalLessons: 6,
      completedLessons: 6,
      thumbnail: '🍽️'
    },
  ]);

  // ----------------------------
  // Filters
  // ----------------------------
  type ProgressFilter = 'ENROLLED' | 'IN_PROGRESS' | 'COMPLETED';
  const [progressFilter, setProgressFilter] = useState<ProgressFilter>('ENROLLED');

  const [selectedCategory, setSelectedCategory] = useState<string>('Alles');
  const categories = ['Alles', ...Array.from(new Set(courses.map(c => c.category)))];

  // ----------------------------
  // Filtered courses
  // ----------------------------
  const filteredCourses = courses.filter(course => {
    // Status / progress filter
    if (progressFilter === 'IN_PROGRESS' && (course.progress === 0 || course.progress === 100)) return false;
    if (progressFilter === 'COMPLETED' && course.progress < 100) return false;

    // Category filter
    if (selectedCategory !== 'Alles' && course.category !== selectedCategory) return false;

    return true;
  });

  // ----------------------------
  // Handlers
  // ----------------------------
  const handleCourseClick = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      alert(`Opening course: ${course.title}`);
    }
  };

  return (
    <div className="progress-container">
      {onBack && (
        <button className="back-button" onClick={onBack}>
          ← Terug na Tuis
        </button>
      )}

      <div className="courses-header">
        <h2>📊 My Vordering</h2>
        <p className="courses-subtitle">
          Volg jou kursusvordering en hou jou leerreis dop.
        </p>
      </div>

      {/* ---------------- Status Filter ---------------- */}
      <div className="progress-filter">
        <button
          className={`progress-button ${progressFilter === 'ENROLLED' ? 'active' : ''}`}
          onClick={() => setProgressFilter('ENROLLED')}
        >
          Ingeskryfde Kursusse
        </button>

        <button
          className={`progress-button ${progressFilter === 'IN_PROGRESS' ? 'active' : ''}`}
          onClick={() => setProgressFilter('IN_PROGRESS')}
        >
          Huidige Vordering
        </button>

        <button
          className={`progress-button ${progressFilter === 'COMPLETED' ? 'active' : ''}`}
          onClick={() => setProgressFilter('COMPLETED')}
        >
          Voltooide Kursusse
        </button>
      </div>

      {/* ---------------- Category Filter ---------------- */}
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ---------------- Course Grid ---------------- */}
      <div className="courses-grid">
        {filteredCourses.map(course => (
          <div
            key={course.id}
            className="course-card"
            onClick={() => handleCourseClick(course.id)}
          >
            <div className="course-thumbnail">{course.thumbnail}</div>
            <div className="course-content">
              <div className="course-category">{course.category}</div>
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>

              <div className="course-progress-section">
                <div className="course-progress-info">
                  <span className="progress-text">
                    {course.completedLessons} / {course.totalLessons} Lesse
                  </span>
                  <span className="progress-percentage">{course.progress}%</span>
                </div>
                <div className="course-progress-bar">
                  <div
                    className="course-progress-fill"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <button className="course-button">
                {course.progress > 0 && course.progress < 100
                  ? 'Gaan Voort'
                  : course.progress === 100
                  ? 'Voltooi'
                  : 'Begin Kursus'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="no-courses">
          <p>Geen kursusse gevind vir hierdie kategorie nie.</p>
        </div>
      )}
    </div>
  );
}
