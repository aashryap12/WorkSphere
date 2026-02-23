import React, { useState, useEffect, useMemo } from 'react';
import Icon from '../../components/DashboardIcons';
import './Tasks.css';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const priorityOptions = [
  { value: 'low', label: 'Low', color: '#64748b' },
  { value: 'medium', label: 'Medium', color: '#f59e0b' },
  { value: 'high', label: 'High', color: '#f97316' },
  { value: 'urgent', label: 'Urgent', color: '#dc2626' },
];

const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchEmployeeAndTasks();
  }, []);

  const fetchEmployeeAndTasks = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const userId = sessionStorage.getItem('userId');
      const userEmail = sessionStorage.getItem('email');

      // Get employee record first
      let empResponse = await fetch(`${API_URL}/api/employees/user/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      if (!empResponse.ok && userEmail) {
        empResponse = await fetch(`${API_URL}/api/employees/email/${encodeURIComponent(userEmail)}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
      }

      if (empResponse.ok) {
        const employee = await empResponse.json();
        setEmployeeId(employee.id);

        // Fetch tasks assigned to this employee
        const tasksResponse = await fetch(`${API_URL}/api/tasks?employeeId=${employee.id}`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });

        if (tasksResponse.ok) {
          const tasksData = await tasksResponse.json();
          setTasks(Array.isArray(tasksData) ? tasksData : []);
        }
      } else {
        setMessage({ type: 'error', text: 'Employee record not found' });
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = useMemo(() => {
    if (statusFilter === 'all') return tasks;
    return tasks.filter((task) => task.status === statusFilter);
  }, [tasks, statusFilter]);

  const stats = useMemo(() => ({
    pending: tasks.filter((t) => t.status === 'pending').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    total: tasks.length,
  }), [tasks]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }

      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
      setMessage({ type: 'success', text: 'Task status updated' });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const getPriorityColor = (priority) => {
    const option = priorityOptions.find((p) => p.value === priority);
    return option ? option.color : '#64748b';
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const isDueToday = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate).toDateString() === new Date().toDateString();
  };

  return (
    <div className="employee-tasks-container">
      <div className="tasks-header">
        <div>
          <h2>My Tasks</h2>
          <p>View and manage your assigned tasks</p>
        </div>
      </div>

      {message.text && (
        <div className={`tasks-alert ${message.type}`}>{message.text}</div>
      )}

      <div className="tasks-stats">
        <div className="stat-card total">
          <div className="stat-icon"><Icon name="tasks" /></div>
          <div className="stat-info">
            <span className="stat-label">Total Tasks</span>
            <span className="stat-number">{stats.total}</span>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon"><Icon name="clock" /></div>
          <div className="stat-info">
            <span className="stat-label">Pending</span>
            <span className="stat-number">{stats.pending}</span>
          </div>
        </div>
        <div className="stat-card in-progress">
          <div className="stat-icon"><Icon name="trend" /></div>
          <div className="stat-info">
            <span className="stat-label">In Progress</span>
            <span className="stat-number">{stats.inProgress}</span>
          </div>
        </div>
        <div className="stat-card completed">
          <div className="stat-icon"><Icon name="check" /></div>
          <div className="stat-info">
            <span className="stat-label">Completed</span>
            <span className="stat-number">{stats.completed}</span>
          </div>
        </div>
      </div>

      <div className="tasks-filters">
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            className={`filter-btn ${statusFilter === opt.value ? 'active' : ''}`}
            onClick={() => setStatusFilter(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="tasks-loading">Loading tasks...</div>
      ) : filteredTasks.length === 0 ? (
        <div className="tasks-empty">
          <Icon name="tasks" />
          <p>No tasks found</p>
          <span>{statusFilter === 'all' ? 'You have no assigned tasks yet' : `No ${statusFilter} tasks`}</span>
        </div>
      ) : (
        <div className="tasks-list">
          {filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className={`task-card ${task.status} ${isOverdue(task.dueDate) && task.status !== 'completed' ? 'overdue' : ''}`}
            >
              <div className="task-header">
                <div className="task-title-section">
                  <span 
                    className="priority-indicator" 
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  />
                  <h4>{task.title}</h4>
                  <span className={`task-status ${task.status}`}>{task.status}</span>
                </div>
                <div className="task-actions">
                  {task.status === 'pending' && (
                    <button 
                      className="btn-action start"
                      onClick={() => handleStatusChange(task.id, 'in-progress')}
                    >
                      <Icon name="trend" /> Start Task
                    </button>
                  )}
                  {task.status === 'in-progress' && (
                    <button 
                      className="btn-action complete"
                      onClick={() => handleStatusChange(task.id, 'completed')}
                    >
                      <Icon name="check" /> Mark Complete
                    </button>
                  )}
                  {task.status === 'completed' && (
                    <span className="completed-badge">
                      <Icon name="check" /> Completed
                    </span>
                  )}
                </div>
              </div>

              <div className="task-body">
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
                
                <div className="task-meta">
                  <div className={`meta-item ${isOverdue(task.dueDate) && task.status !== 'completed' ? 'overdue' : ''} ${isDueToday(task.dueDate) ? 'due-today' : ''}`}>
                    <Icon name="calendar" />
                    <span>
                      {isOverdue(task.dueDate) && task.status !== 'completed' ? 'Overdue: ' : ''}
                      {isDueToday(task.dueDate) ? 'Due Today' : `Due: ${formatDate(task.dueDate)}`}
                    </span>
                  </div>
                  {task.category && (
                    <div className="meta-item">
                      <Icon name="folder" />
                      <span>{task.category}</span>
                    </div>
                  )}
                  {task.estimatedHours && (
                    <div className="meta-item">
                      <Icon name="clock" />
                      <span>{task.estimatedHours} hrs estimated</span>
                    </div>
                  )}
                  <div className="meta-item priority">
                    <span 
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(task.priority) }}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>

                {task.notes && (
                  <div className="task-notes">
                    <strong>Notes:</strong> {task.notes}
                  </div>
                )}

                {task.assignedByName && (
                  <div className="task-assigned-by">
                    Assigned by: <strong>{task.assignedByName}</strong>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
