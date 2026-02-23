import React, { useMemo, useState, useEffect } from 'react';
import Icon from '../../components/DashboardIcons';
import './ManagerApprovals.css';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const statusOptions = [
	{ value: 'all', label: 'All' },
	{ value: 'pending', label: 'Pending' },
	{ value: 'approved', label: 'Approved' },
	{ value: 'rejected', label: 'Rejected' },
];

const initialRequests = [];

const formatDate = (value) => {
	if (!value) return '—';
	const normalized = value.includes('T') ? value : `${value}T00:00:00`;
	const date = new Date(normalized);
	if (Number.isNaN(date.getTime())) return value;
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}).format(date);
};

const formatDateRange = (start, end) => {
	if (!start && !end) return '—';
	if (start && end && start !== end) return `${formatDate(start)} - ${formatDate(end)}`;
	return formatDate(start || end);
};

const ManagerApprovals = () => {
	const [requests, setRequests] = useState([]);
	const [statusFilter, setStatusFilter] = useState('pending');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchRequests();
	}, []);

	const fetchRequests = async () => {
		setLoading(true);
		try {
			const token = sessionStorage.getItem('token');
			const response = await fetch(`${API_URL}/api/requests/manager/all`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Failed to fetch requests: ${response.status}`);
			}

			const data = await response.json();
			setRequests(Array.isArray(data) ? data : []);
			console.log('✓ Manager requests loaded:', data.length);
		} catch (error) {
			console.error('Error fetching requests:', error);
			setMessage(`Failed to load requests: ${error.message}`);
		} finally {
			setLoading(false);
		}
	};

	const filteredRequests = useMemo(() => {
		if (statusFilter === 'all') return requests;
		return requests.filter((request) => request.status === statusFilter);
	}, [requests, statusFilter]);

	const stats = useMemo(() => ({
		pending: requests.filter((request) => request.status === 'pending').length,
		approved: requests.filter((request) => request.status === 'approved').length,
		rejected: requests.filter((request) => request.status === 'rejected').length,
		total: requests.length,
	}), [requests]);

	const updateRequestStatus = (id, status) => {
		setRequests((prev) => prev.map((request) => (
			request.id === id ? { ...request, status, approvedBy: status === 'approved' ? 'Manager' : request.approvedBy } : request
		)));
	};

	const handleApprove = async (id) => {
		try {
			const token = sessionStorage.getItem('token');
			const response = await fetch(`${API_URL}/api/requests/${id}/approve`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Failed to approve request: ${response.status}`);
			}

			const updatedRequest = await response.json();
			setRequests((prev) => prev.map((req) => (req.id === id ? updatedRequest : req)));
			setMessage('✓ Request approved successfully');
			setTimeout(() => setMessage(''), 3000);
		} catch (error) {
			console.error('Error approving request:', error);
			setMessage(`✗ Failed to approve: ${error.message}`);
		}
	};

	const handleReject = async (id) => {
		try {
			const token = sessionStorage.getItem('token');
			const response = await fetch(`${API_URL}/api/requests/${id}/reject`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`Failed to reject request: ${response.status}`);
			}

			const updatedRequest = await response.json();
			setRequests((prev) => prev.map((req) => (req.id === id ? updatedRequest : req)));
			setMessage('✓ Request rejected successfully');
			setTimeout(() => setMessage(''), 3000);
		} catch (error) {
			console.error('Error rejecting request:', error);
			setMessage(`✗ Failed to reject: ${error.message}`);
		}
	};

	return (
		<div className="manager-approvals-container">
			<div className="approvals-header">
				<div>
					<h2>Team Approvals</h2>
					<p>Review and decide on employee requests.</p>
				</div>
				<div className="approvals-filters">
					{statusOptions.map((option) => (
						<button
							key={option.value}
							type="button"
							className={`filter-btn ${statusFilter === option.value ? 'active' : ''}`}
							onClick={() => setStatusFilter(option.value)}
						>
							{option.label}
						</button>
					))}
				</div>
			</div>

			<div className="approvals-stats">
				<div className="stat-card pending">
					<div className="stat-icon">
						<Icon name="clock" />
					</div>
					<div>
						<span className="stat-label">Pending</span>
						<span className="stat-number">{stats.pending}</span>
					</div>
				</div>
				<div className="stat-card approved">
					<div className="stat-icon">
						<Icon name="check" />
					</div>
					<div>
						<span className="stat-label">Approved</span>
						<span className="stat-number">{stats.approved}</span>
					</div>
				</div>
				<div className="stat-card rejected">
					<div className="stat-icon">
						<Icon name="warning" />
					</div>
					<div>
						<span className="stat-label">Rejected</span>
						<span className="stat-number">{stats.rejected}</span>
					</div>
				</div>
				<div className="stat-card total">
					<div className="stat-icon">
						<Icon name="file" />
					</div>
					<div>
						<span className="stat-label">Total</span>
						<span className="stat-number">{stats.total}</span>
					</div>
				</div>
			</div>

			{message ? <div className="approvals-alert info">{message}</div> : null}

			<div className="approvals-list">
			{loading ? (
				<div className="approvals-empty">
					<Icon name="loading" />
					<p>Loading requests...</p>
				</div>
			) : filteredRequests.length === 0 ? (
					<div className="approvals-empty">
						<Icon name="file" />
						<p>No requests found for this filter.</p>
					</div>
				) : (
				filteredRequests.map((request, index) => (
					<div key={`approval-${index}-${request.type}`} className={`approval-card status-${request.status}`}>
							<div className="approval-main">
								<div>
									<div className="approval-type">
										<span className="type-pill">{request.type}</span>
										<span className={`status-pill ${request.status}`}>{request.status}</span>
									</div>
								<h3>{request.description || 'Request'}</h3>
								<div className="approval-meta">
									
									<span>{formatDateRange(request.startDate, request.endDate)}</span>
										<span>Submitted: {formatDate(request.submittedDate)}</span>
									</div>
								</div>
								<div className="approval-actions">
									{request.status === 'pending' && (
										<>
											<button
												type="button"
												className="btn-approve"
												onClick={() => handleApprove(request.id)}
											>
												<Icon name="check" />
												Approve
											</button>
											<button
												type="button"
												className="btn-reject"
												onClick={() => handleReject(request.id)}
											>
												<Icon name="close" />
												Reject
											</button>
										</>
									)}
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default ManagerApprovals;
