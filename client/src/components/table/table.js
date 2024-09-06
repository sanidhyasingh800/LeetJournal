import React from 'react';
import {useState, useEffect } from 'react';
import moment from 'moment';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress,
  Checkbox, Paper, Typography, Chip, TablePagination
} from '@mui/material';
import { green, orange, red } from '@mui/material/colors';

import { useDispatch, useSelector } from 'react-redux';
import { StyledTableRow, StyledTableCell} from './styles';
import { sortQuestions, getQuestions } from '../../actions/questions';  





  const DifficultyChip = ({difficulty}) => {
    let color = 'default';
  
    switch (difficulty) {
      case 'Easy':
        color = green[500];
        break;
      case 'Medium':
        color = orange[500];
        break;
      case 'Hard':
        color = red[500];
        break;
      default:
        color = 'default';
    }
  
    return <Chip label={difficulty} sx={{ backgroundColor: color, color: '#fff' }} />;
  }

const DetailsTable= ({currentId, setCurrentId, userId}) => {
    const dispatch = useDispatch();
    // console.log(userId);
    useEffect(() =>{
    dispatch(getQuestions(userId));
    }, [dispatch, userId]);
    const questions = useSelector((state) => state.questions|| []);

    const handleRowClick = (question) => {
        setCurrentId(question._id);
    }
     
    const [key, setKey]= useState("Date");



    const sort = (key) => {
        console.log(key);
        dispatch(sortQuestions(userId, [...questions].sort((q1, q2) => {
            switch(key){
                case "Question":
                    return q1.title.localeCompare(q2.title);
                case "Difficulty":
                    const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
                    return difficultyOrder[q1.difficulty] - difficultyOrder[q2.difficulty];
                case "Status":
                    const status_ordering = { 'Not Attempted': 1, 'Attempted': 2, 'Solved': 3 };
                    return status_ordering[q1.status] - status_ordering[q2.status];
                case "Date":
                    return new Date(q1.createdAt)- new Date(q2.createdAt);
                default:
                    return new Date(q1.createdAt)- new Date(q2.createdAt);
            }

        })));
        console.log("dispatch is sent");
    }

    useEffect(() => sort(key), [key]);


      // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0); // Reset to first page
  };

  const paginatedQuestions = questions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" component="div" style={{ padding: 16 }}>
        Questions
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell onClick = {() => {setKey("Question"); sort(key)}}>Question</StyledTableCell>
            <StyledTableCell onClick = {() => {setKey("Difficulty"); sort(key)}}>Difficulty</StyledTableCell>
            <StyledTableCell onClick = {() => {setKey("Status"); sort(key)}}>Status</StyledTableCell>
            <StyledTableCell >Tags</StyledTableCell>
            <StyledTableCell onClick = {() => {setKey("Date"); sort(key)}}>Date</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {paginatedQuestions.map((question) => (
            <StyledTableRow key={question.title} onClick={() => handleRowClick(question)}>
              <TableCell component="th" scope="question">
                {question.title}
              </TableCell>
              <TableCell>
                <DifficultyChip difficulty={question.difficulty} />
              </TableCell>
              <TableCell align="right">{question.status}</TableCell>
              <TableCell align="right">{question.tags}</TableCell>
              <TableCell align="right">{moment(question.createdAt).date()}/{moment(question.createdAt).month()+1}/{moment(question.createdAt).year()}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
        component="div"
        count={questions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
    
  );
}

export default DetailsTable;
