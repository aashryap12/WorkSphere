package com.wfms.worksphere_backend.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "payrolls")
public class Payroll {
	@Id
	private ObjectId id;
	private ObjectId employeeId;
	private LocalDate periodStart;
	private LocalDate periodEnd;
	private BigDecimal grossPay;
	private BigDecimal netPay;
	private BigDecimal taxAmount;
	private BigDecimal deductions;
	private String status;
	private Instant paidAt;
	private Instant createdAt;
	private Instant updatedAt;
}
