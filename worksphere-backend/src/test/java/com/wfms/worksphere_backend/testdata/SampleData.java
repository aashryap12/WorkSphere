package com.wfms.worksphere_backend.testdata;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.bson.types.ObjectId;

import com.wfms.worksphere_backend.model.Attendance;
import com.wfms.worksphere_backend.model.Department;
import com.wfms.worksphere_backend.model.Employee;
import com.wfms.worksphere_backend.model.Payroll;
import com.wfms.worksphere_backend.model.Payment;
import com.wfms.worksphere_backend.model.Request;
import com.wfms.worksphere_backend.model.Role;
import com.wfms.worksphere_backend.model.Shift;
import com.wfms.worksphere_backend.model.StatusTracking;
import com.wfms.worksphere_backend.model.User;
import com.wfms.worksphere_backend.model.Vendor;

public final class SampleData {
	private SampleData() {
	}

	public static List<Role> roles() {
		Instant now = Instant.parse("2026-02-18T06:00:00Z");
		return List.of(
				new Role(roleAdminId(), "ADMIN", "System administrator",
						List.of("users:read", "users:write", "requests:approve"), now, now),
				new Role(roleManagerId(), "MANAGER", "Department manager",
						List.of("employees:read", "requests:read", "requests:write"), now, now));
	}

	public static List<User> users() {
		Instant now = Instant.parse("2026-02-18T06:10:00Z");
		return List.of(
				new User(userAdminId(), "admin", "admin@worksphere.com", "hash_admin", true, roleAdminId(),
						now, now),
				new User(userManagerId(), "manager", "manager@worksphere.com", "hash_manager", true,
						roleManagerId(), now, now),
				new User(userEmployeeId(), "employee", "employee@worksphere.com", "hash_employee", true,
						roleManagerId(), now, now));
	}

	public static List<Department> departments() {
		Instant now = Instant.parse("2026-02-18T06:20:00Z");
		return List.of(
				new Department(departmentEngId(), "Engineering", "ENG", employeeManagerId(), "Product build team",
						true, now, now),
				new Department(departmentHrId(), "Human Resources", "HR", employeeManagerId(), "People operations",
						true, now, now));
	}

	public static List<Employee> employees() {
		Instant now = Instant.parse("2026-02-18T06:30:00Z");
		return List.of(
				new Employee(employeeManagerId(), userManagerId(), departmentEngId(), "EMP-1001", "Asha", "Patel",
						"asha.patel@worksphere.com", "+91-90000-00001", "Engineering Manager",
						LocalDate.of(2021, 3, 15), "ACTIVE", null, now, now),
				new Employee(employeeStaffId(), userEmployeeId(), departmentEngId(), "EMP-1002", "Ravi", "Kumar",
						"ravi.kumar@worksphere.com", "+91-90000-00002", "Software Engineer",
						LocalDate.of(2023, 7, 10), "ACTIVE", employeeManagerId(), now, now));
	}

	public static List<Shift> shifts() {
		Instant now = Instant.parse("2026-02-18T06:40:00Z");
		return List.of(
				new Shift(shiftDayId(), "Day Shift", LocalTime.of(9, 0), LocalTime.of(18, 0), "Asia/Kolkata", 60,
						true, now, now));
	}

	public static List<Attendance> attendance() {
		Instant now = Instant.parse("2026-02-18T06:50:00Z");
		return List.of(
				new Attendance(attendanceId(), employeeStaffId(), shiftDayId(), LocalDate.of(2026, 2, 18),
						Instant.parse("2026-02-18T03:30:00Z"), Instant.parse("2026-02-18T12:30:00Z"), "PRESENT",
						"On time", now, now));
	}

	public static List<Payroll> payrolls() {
		Instant now = Instant.parse("2026-02-18T07:00:00Z");
		return List.of(
				new Payroll(payrollId(), employeeStaffId(), LocalDate.of(2026, 1, 1), LocalDate.of(2026, 1, 31),
						new BigDecimal("3000.00"), new BigDecimal("2550.00"), new BigDecimal("300.00"),
						new BigDecimal("150.00"), "PAID", Instant.parse("2026-02-05T08:00:00Z"), now, now));
	}

	public static List<Vendor> vendors() {
		Instant now = Instant.parse("2026-02-18T07:10:00Z");
		return List.of(
				new Vendor(vendorAcmeId(), "Acme Supplies", "billing@acme.com", "+91-91111-11111",
						"Mumbai, IN", true, now, now));
	}

	public static List<Request> requests() {
		Instant now = Instant.parse("2026-02-18T07:20:00Z");
		return List.of(
				new Request(requestId(), "PURCHASE", "Laptop procurement", "Purchase 5 laptops", userManagerId(),
						vendorAcmeId(), paymentId(), "APPROVED", now, now));
	}

	public static List<Payment> payments() {
		Instant now = Instant.parse("2026-02-18T07:30:00Z");
		return List.of(
				new Payment(paymentId(), requestId(), new BigDecimal("5000.00"), "INR", "BANK_TRANSFER", "SETTLED",
						Instant.parse("2026-02-12T09:00:00Z"), now, now));
	}

	public static List<StatusTracking> statusTracking() {
		return List.of(
				new StatusTracking(statusTrackingId(), requestId(), "APPROVED", "Approved by manager", userAdminId(),
						Instant.parse("2026-02-18T07:40:00Z")));
	}

	public static ObjectId roleAdminId() {
		return new ObjectId("64b7f0a1a1a1a1a1a1a1a1a1");
	}

	public static ObjectId roleManagerId() {
		return new ObjectId("64b7f0a2a2a2a2a2a2a2a2a2");
	}

	public static ObjectId userAdminId() {
		return new ObjectId("64b7f0b1b1b1b1b1b1b1b1b1");
	}

	public static ObjectId userManagerId() {
		return new ObjectId("64b7f0b2b2b2b2b2b2b2b2b2");
	}

	public static ObjectId userEmployeeId() {
		return new ObjectId("64b7f0b3b3b3b3b3b3b3b3b3");
	}

	public static ObjectId departmentEngId() {
		return new ObjectId("64b7f0c1c1c1c1c1c1c1c1c1");
	}

	public static ObjectId departmentHrId() {
		return new ObjectId("64b7f0c2c2c2c2c2c2c2c2c2");
	}

	public static ObjectId employeeManagerId() {
		return new ObjectId("64b7f0d1d1d1d1d1d1d1d1d1");
	}

	public static ObjectId employeeStaffId() {
		return new ObjectId("64b7f0d2d2d2d2d2d2d2d2d2");
	}

	public static ObjectId shiftDayId() {
		return new ObjectId("64b7f0e1e1e1e1e1e1e1e1e1");
	}

	public static ObjectId attendanceId() {
		return new ObjectId("64b7f0f1f1f1f1f1f1f1f1f1");
	}

	public static ObjectId payrollId() {
		return new ObjectId("64b7f101010101010101010101");
	}

	public static ObjectId vendorAcmeId() {
		return new ObjectId("64b7f111111111111111111111");
	}

	public static ObjectId requestId() {
		return new ObjectId("64b7f121212121212121212121");
	}

	public static ObjectId paymentId() {
		return new ObjectId("64b7f131313131313131313131");
	}

	public static ObjectId statusTrackingId() {
		return new ObjectId("64b7f141414141414141414141");
	}
}
