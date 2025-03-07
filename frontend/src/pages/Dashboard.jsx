import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { priorityData } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#7a8797',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f0f4f7',
  },
}));

const Dashboard = () => {
  const { tasksData } = useContext(StoreContext);

  const [dashboardData, setDashboardData] = useState({
    total_tasks: 0,
    completed_tasks: 0,
    pending_tasks: 0,
  });

  function calculateStats() {
    const total = tasksData.length;
    let completed = 0;

    tasksData.forEach(item => {
      if (item.status) {
        completed += 1;
      }
    });
    setDashboardData({
      total_tasks: total,
      completed_tasks: completed,
      pending_tasks: total - completed,
    });
  }

  function calculatePriorityStats() {
    priorityData.forEach(item => {
      let cnt = 0;
      tasksData.forEach(task => {
        if (!task.status && task.priority === item.priority) {
          cnt += 1;
        }
      });
      item.count = cnt;
    });
  }

  useEffect(() => {
    calculateStats();
    calculatePriorityStats();
  }, [tasksData]);

  return (
    <Container>
      <Typography variant="h4" sx={{ my: '20px' }}>
        Dashboard
      </Typography>
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h6">Summary</Typography>
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-start', gap: '30px' }}
        >
          <Box>
            <Typography variant="h6" color="primary">
              {dashboardData.total_tasks}
            </Typography>
            <Typography variant="body2">Total tasks</Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="primary">
              {`${(
                (dashboardData.completed_tasks / dashboardData.total_tasks) *
                100
              ).toFixed(1)}%`}
            </Typography>
            <Typography variant="body2">Taks Completed</Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="primary">
              {`${(
                (dashboardData.pending_tasks / dashboardData.total_tasks) *
                100
              ).toFixed(1)}%`}
            </Typography>
            <Typography variant="body2">Tasks pending</Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography variant="h6">Pending tasks summary</Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Task priority</StyledTableCell>
              <StyledTableCell align="center">Pending tasks</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {priorityData.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{row.priority}</StyledTableCell>
                <StyledTableCell align="center">{row.count}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
