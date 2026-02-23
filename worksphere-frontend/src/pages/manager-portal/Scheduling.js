import React, { useState, useEffect, useMemo } from 'react';
import Icon from '../../components/DashboardIcons';
import './Scheduling.css';

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
  { value: 'cancelled', label: 'Cancelled' },
];

const categoryOptions = [
  { value: 'project', label: 'Project Work' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'review', label: 'Review' },
  { value: 'training', label: 'Training' },
  { value: 'other', label: 'Other' },
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

const Scheduling = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium',
    category: 'project',
    dueDate: '',
    startDate: '',
    estimatedHours: '',
    notes: '',
  });

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.status}`);
      }

      const data = await response.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEmployees(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      assignedTo: '',
      priority: 'medium',
      category: 'project',
      dueDate: '',
      startDate: '',
      estimatedHours: '',
      notes: '',
    });
    setEditingTask(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const token = sessionStorage.getItem('token');
      const url = editingTask 
        ? `${API_URL}/api/tasks/${editingTask.id}` 
        : `${API_URL}/api/tasks`;
      
      const payload = {
        ...formData,
        estimatedHours: formData.estimatedHours ? parseInt(formData.estimatedHours) : null,
      };

      const response = await fetch(url, {
        method: editingTask ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingTask ? 'update' : 'create'} task`);
      }

      setMessage({ 
        type: 'success', 
        text: `Task ${editingTask ? 'updated' : 'created'} successfully` 
      });
      resetForm();
      fetchTasks();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleEdit = (task) => {
    setFormData({
      title: task.title || '',
      description: task.description || '',
      assignedTo: task.assignedTo || '',
      priority: task.priority || 'medium',
      category: task.category || 'project',
      dueDate: task.dueDate || '',
      startDate: task.startDate || '',
      estimatedHours: task.estimatedHours?.toString() || '',
      notes: task.notes || '',
    });
    setEditingTask(task);
    setShowForm(true);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
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
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      setMessage({ type: 'success', text: 'Task deleted successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const getPriorityColor = (priority) => {
    const option = priorityOptions.find((p) => p.value === priority);
    return option ? option.color : '#64748b';
  };

  return (
    <div className="scheduling-container">
      <div className="scheduling-header">
        <div>
          <h2>Task Scheduling</h2>
          <p>Allocate and manage tasks for your team members</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Assign New Task'}
        </button>
      </div>

      {message.text && (
        <div className={`scheduling-alert ${message.type}`}>{message.text}</div>
      )}

      {showForm && (
        <div className="task-form-card">
          <h3>{editingTask ? 'Edit Task' : 'Assign New Task'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Task Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter task title"
                  required
                />
              </div>
              <div className="form-group">
                <label>Assign To *</label>
                <select
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.firstName} {emp.lastName} - {emp.jobTitle || emp.department || 'Employee'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter task description"
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  {priorityOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {categoryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Est. Hours</label>
                <input
                  type="number"
                  name="estimatedHours"
                  value={formData.estimatedHours}
                  onChange={handleInputChange}
                  placeholder="Hours"
                  min="1"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Due Date *</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Additional notes or instructions"
                rows="2"
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingTask ? 'Update Task' : 'Assign Task'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="scheduling-stats">
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

      <div className="scheduling-filters">
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
        <div className="scheduling-loading">Loading tasks...</div>
      ) : filteredTasks.length === 0 ? (
        <div className="scheduling-empty">
          <Icon name="tasks" />
          <p>No tasks found</p>
          <span>Click "Assign New Task" to create a task for your team</span>
        </div>
      ) : (
        <div className="tasks-list">
          {filteredTasks.map((task) => (
            <div key={task.id} className={`task-card ${task.status}`}>
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
                  <select
                    className="status-select"
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button className="btn-icon" onClick={() => handleEdit(task)} title="Edit">
                    <Icon name="edit" />
                  </button>
                  <button className="btn-icon delete" onClick={() => handleDelete(task.id)} title="Delete">
                    <Icon name="trash" />
                  </button>
                </div>
              </div>

              <div className="task-body">
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
                
                <div className="task-meta">
                  <div className="meta-item">
                    <Icon name="user" />
                    <span>{task.assignedToName || 'Unassigned'}</span>
                  </div>
                  <div className="meta-item">
                    <Icon name="calendar" />
                    <span>Due: {formatDate(task.dueDate)}</span>
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
                      <span>{task.estimatedHours} hrs</span>
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Scheduling;
