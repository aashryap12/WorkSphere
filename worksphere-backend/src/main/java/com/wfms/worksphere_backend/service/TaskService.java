package com.wfms.worksphere_backend.service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.wfms.worksphere_backend.dto.TaskDTO;
import com.wfms.worksphere_backend.model.Employee;
import com.wfms.worksphere_backend.model.Task;
import com.wfms.worksphere_backend.model.User;
import com.wfms.worksphere_backend.repository.EmployeeRepository;
import com.wfms.worksphere_backend.repository.TaskRepository;
import com.wfms.worksphere_backend.repository.UserRepository;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, EmployeeRepository employeeRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
    }

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<TaskDTO> getTasksByEmployee(String employeeId) {
        try {
            ObjectId empId = new ObjectId(employeeId);
            return taskRepository.findByAssignedTo(empId).stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            return List.of();
        }
    }

    public List<TaskDTO> getTasksByManager(String managerId) {
        try {
            ObjectId mgrId = new ObjectId(managerId);
            return taskRepository.findByAssignedBy(mgrId).stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            return List.of();
        }
    }

    public List<TaskDTO> getTasksByStatus(String status) {
        return taskRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<TaskDTO> getTasksByDateRange(LocalDate start, LocalDate end) {
        return taskRepository.findByDueDateBetween(start, end).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TaskDTO getTaskById(String id) {
        return taskRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = new Task();
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setPriority(taskDTO.getPriority() != null ? taskDTO.getPriority() : "medium");
        task.setStatus("pending");
        task.setDueDate(taskDTO.getDueDate());
        task.setStartDate(taskDTO.getStartDate());
        task.setCategory(taskDTO.getCategory());
        task.setEstimatedHours(taskDTO.getEstimatedHours());
        task.setNotes(taskDTO.getNotes());
        task.setCreatedAt(Instant.now());
        task.setUpdatedAt(Instant.now());

        if (taskDTO.getAssignedTo() != null && !taskDTO.getAssignedTo().isEmpty()) {
            try {
                task.setAssignedTo(new ObjectId(taskDTO.getAssignedTo()));
            } catch (IllegalArgumentException e) {
                // Invalid ObjectId, leave as null
            }
        }

        if (taskDTO.getAssignedBy() != null && !taskDTO.getAssignedBy().isEmpty()) {
            try {
                task.setAssignedBy(new ObjectId(taskDTO.getAssignedBy()));
            } catch (IllegalArgumentException e) {
                // Invalid ObjectId, leave as null
            }
        }

        Task saved = taskRepository.save(task);
        return convertToDTO(saved);
    }

    public TaskDTO updateTask(String id, TaskDTO taskDTO) {
        Task existing = taskRepository.findById(id).orElse(null);
        if (existing == null) return null;

        if (taskDTO.getTitle() != null) {
            existing.setTitle(taskDTO.getTitle());
        }
        if (taskDTO.getDescription() != null) {
            existing.setDescription(taskDTO.getDescription());
        }
        if (taskDTO.getPriority() != null) {
            existing.setPriority(taskDTO.getPriority());
        }
        if (taskDTO.getStatus() != null) {
            String oldStatus = existing.getStatus();
            existing.setStatus(taskDTO.getStatus());
            
            // Set completedAt when status changes to completed
            if ("completed".equals(taskDTO.getStatus()) && !"completed".equals(oldStatus)) {
                existing.setCompletedAt(Instant.now());
            }
        }
        if (taskDTO.getDueDate() != null) {
            existing.setDueDate(taskDTO.getDueDate());
        }
        if (taskDTO.getStartDate() != null) {
            existing.setStartDate(taskDTO.getStartDate());
        }
        if (taskDTO.getCategory() != null) {
            existing.setCategory(taskDTO.getCategory());
        }
        if (taskDTO.getEstimatedHours() != null) {
            existing.setEstimatedHours(taskDTO.getEstimatedHours());
        }
        if (taskDTO.getActualHours() != null) {
            existing.setActualHours(taskDTO.getActualHours());
        }
        if (taskDTO.getNotes() != null) {
            existing.setNotes(taskDTO.getNotes());
        }
        if (taskDTO.getAssignedTo() != null && !taskDTO.getAssignedTo().isEmpty()) {
            try {
                existing.setAssignedTo(new ObjectId(taskDTO.getAssignedTo()));
            } catch (IllegalArgumentException e) {
                // Invalid ObjectId, keep existing
            }
        }

        existing.setUpdatedAt(Instant.now());
        Task saved = taskRepository.save(existing);
        return convertToDTO(saved);
    }

    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }

    private TaskDTO convertToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setPriority(task.getPriority());
        dto.setStatus(task.getStatus());
        dto.setDueDate(task.getDueDate());
        dto.setStartDate(task.getStartDate());
        dto.setCategory(task.getCategory());
        dto.setEstimatedHours(task.getEstimatedHours());
        dto.setActualHours(task.getActualHours());
        dto.setNotes(task.getNotes());
        dto.setCreatedAt(task.getCreatedAt());
        dto.setUpdatedAt(task.getUpdatedAt());
        dto.setCompletedAt(task.getCompletedAt());

        if (task.getAssignedTo() != null) {
            dto.setAssignedTo(task.getAssignedTo().toHexString());
            Employee employee = employeeRepository.findById(task.getAssignedTo()).orElse(null);
            if (employee != null) {
                dto.setAssignedToName(employee.getFirstName() + " " + employee.getLastName());
            }
        }

        if (task.getAssignedBy() != null) {
            dto.setAssignedBy(task.getAssignedBy().toHexString());
            User user = userRepository.findById(task.getAssignedBy()).orElse(null);
            if (user != null) {
                dto.setAssignedByName(user.getUsername());
            }
        }

        return dto;
    }
}
