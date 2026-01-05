import { useState } from 'react';
import './Courses.css';

interface CoursesProps {
  onBack?: () => void;
}

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

export default function Courses({ onBack }: CoursesProps) {
  const [courses, setCourses] = useState<Course[]>([
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
      title: 'Trou Décor en Styling',
      description: 'Kry kreatiewe idees vir troudécor en leer hoe om jou visie te verwesenlik.',
      category: 'Décor',
      progress: 0,
      totalLessons: 10,
      completedLessons: 0,
      thumbnail: '💐'
    },
    {
      id: '4',
      title: 'Katering en Menu Beplanning',
      description: 'Leer hoe om die regte katering te kies en \'n perfekte menu saam te stel.',
      category: 'Katering',
      progress: 50,
      totalLessons: 6,
      completedLessons: 3,
      thumbnail: '🍽️'
    },
    {
      id: '5',
      title: 'Fotografie en Videografie',
      description: 'Ontdek hoe om die regte fotograaf en videograaf te kies vir jou troue.',
      category: 'Verskaffers',
      progress: 0,
      totalLessons: 7,
      completedLessons: 0,
      thumbnail: '📸'
    },
    {
      id: '6',
      title: 'Finansiële Beplanning vir Troues',
      description: 'Leer hoe om \'n begroting op te stel en jou troue finansieel te beplan.',
      category: 'Finansies',
      progress: 0,
      totalLessons: 9,
      completedLessons: 0,
      thumbnail: '💰'
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('Alles');
  const categories = ['Alles', ...Array.from(new Set(courses.map(c => c.category)))];

  const filteredCourses = selectedCategory === 'Alles' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  const handleCourseClick = (courseId: string) => {
    // This would navigate to course details in a real app
    console.log('Opening course:', courseId);
    // For now, we'll just show an alert
    const course = courses.find(c => c.id === courseId);
    if (course) {
      alert(`Opening course: ${course.title}\n\nThis would navigate to the course content in a full implementation.`);
    }
  };

  return (
    <div className="courses-container">
      {onBack && (
        <button className="back-button" onClick={onBack}>
          ← Terug na Tuis
        </button>
      )}
      <div className="courses-header">
        <h2>📚 My Kursusse</h2>
        <p className="courses-subtitle">
          Verken ons versameling kursusse en begin jou leerreis vandag!
        </p>
      </div>

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

      <div className="courses-grid">
        {filteredCourses.map((course) => (
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
                {course.progress > 0 ? 'Gaan Voort' : 'Begin Kursus'}
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

