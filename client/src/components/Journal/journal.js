import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField, Button, CircularProgress, Paper, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';

import ace from 'ace-builds/src-noconflict/ace';

import { MainContainer, StyledPaper } from './styles';
import { updateJournal } from "../../actions/questions";


ace.config.set("basePath", "/ace-workers");  // Path to where worker files are located in public directory
ace.config.setModuleUrl("ace/mode/javascript_worker", "/ace-workers/worker-javascript.js");

const Journal = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch();
    const selectedQuestion = useSelector((state) => {
        if (currentId) {
            return state.questions.find((question) => question._id === currentId);
        }
        return null;
    });

    const [code, setCode] = useState('');
    const [notes, setNotes] = useState('');
    const [language, setLanguage] = useState('c_cpp');  // Default to JavaScript mode

    useEffect(() => {
        if (selectedQuestion) {
            setCode(selectedQuestion.code || '');  // Load saved code if available
            setNotes(selectedQuestion.notes || '');  // Load saved notes if available
        }
    }, [selectedQuestion]);

    const handleSave = () => {
        // Dispatch action to save code and notes (not implemented in this example)
        if(currentId){
            dispatch(updateJournal(currentId, notes, code));
        }
    };



    return (
        <MainContainer>
        <StyledPaper elevation={1}>
            <Typography variant="h5" gutterBottom>
                {selectedQuestion? `${selectedQuestion.title} - `: ""} Journal
            </Typography>

            {/* Language Selector */}
            <Typography variant="h6" gutterBottom>
                Language
            </Typography>
            <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                fullWidth
                variant="outlined"
                style={{ marginBottom: '16px' }}
            >
                <MenuItem value="java">Java</MenuItem>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="c_cpp">C++</MenuItem>
            </Select>

            <Typography variant="h6" gutterBottom>
                Code
            </Typography>
            <AceEditor
                mode={language}  // Set the mode based on the selected language
                theme="monokai"
                name="code-editor"
                onChange={setCode}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={code}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
                style={{ width: '100%' }}
            />
            <Typography variant="h6" gutterBottom style={{ marginTop: '16px' }}>
                Notes
            </Typography>
            <TextField
                multiline
                rows={5}
                variant="outlined"
                fullWidth
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSave}
                style={{ marginTop: '16px' }}
            >
                Save
            </Button>
        </StyledPaper>
    </MainContainer>
    );
};

export default Journal;
