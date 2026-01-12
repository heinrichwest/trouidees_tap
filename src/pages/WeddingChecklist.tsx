import { useState } from 'react';
import './WeddingChecklist.css';

interface ChecklistItem {
  id: string;
  task: string;
  completed: boolean;
  category: string;
}

export default function WeddingChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', task: 'Troudatum vasgestel', completed: false, category: 'Basics' },
    { id: '2', task: 'Begroting bepaal', completed: false, category: 'Finansies' },
    { id: '3', task: 'Venue gekies', completed: false, category: 'Venue' },
    { id: '4', task: 'Trourok gekies', completed: false, category: 'Kleding' },
    { id: '5', task: 'Fotograaf geboek', completed: false, category: 'Verskaffers' },
    { id: '6', task: 'Troukaartjies bestel', completed: false, category: 'Décor' },
    { id: '7', task: 'Voedselmenu bepaal', completed: false, category: 'Katering' },
    { id: '8', task: 'Bruidsmeisies gekies', completed: false, category: 'Bruidsmeisies' },
    { id: '9', task: 'Huweliksregistrasie gereël', completed: false, category: 'Wettig' },
    { id: '10', task: 'Troukoek bestel', completed: false, category: 'Katering' },
  ]);

  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Algemeen');

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setItems([
        ...items,
        {
          id: Date.now().toString(),
          task: newTask,
          completed: false,
          category: selectedCategory,
        },
      ]);
      setNewTask('');
    }
  };

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="checklist-container">
      <div className="checklist-header">
        <h2>💍 Jou Troubeplanningslys</h2>
        <p className="checklist-subtitle">
          "Onthou: jou troue is net een dag. Jou huwelik is 'n leeftyd." ✨
        </p>
      </div>

      <div className="progress-section">
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="progress-text">
          {completedCount} van {totalCount} take voltooi ({Math.round(progress)}%)
        </p>
      </div>

      <div className="add-task-section">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Voeg 'n nuwe taak by..."
          className="task-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="Algemeen">Algemeen</option>
          <option value="Venue">Venue</option>
          <option value="Kleding">Kleding</option>
          <option value="Verskaffers">Verskaffers</option>
          <option value="Katering">Katering</option>
          <option value="Décor">Décor</option>
          <option value="Finansies">Finansies</option>
        </select>
        <button onClick={addTask} className="add-button">
          Voeg By
        </button>
      </div>

      <div className="checklist-items">
        {items.map((item) => (
          <div
            key={item.id}
            className={`checklist-item ${item.completed ? 'completed' : ''}`}
          >
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItem(item.id)}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              <span className="task-text">{item.task}</span>
            </label>
            <span className="task-category">{item.category}</span>
          </div>
        ))}
      </div>

      {completedCount === totalCount && totalCount > 0 && (
        <div className="completion-message">
          🎉 Fantasties! Jy het al jou take voltooi! Jy is gereed vir jou spesiale dag! 💕
        </div>
      )}
    </div>
  );
}





