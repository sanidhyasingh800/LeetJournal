
import QuestionMessage from "../models/questionmessage.js";
import mongoose from "mongoose";
// abstract the routes and route handling for better scalability
// export functions essentially make them available everywhere until they are intercepted by an import

export const getQuestions = async (req, res) => {
    const { userId: id } = req.params; // req objects store params that they dynamically expect from the URL so we can access them through destructuring
    console.log("request: ", req.params);
    try {
        const questionMessages = await QuestionMessage.find({userId: id}); // model find all instances operation C(READ)UD
        console.log(questionMessages);
        res.status(200).json(questionMessages); // return a success status (200) and return the questionMessages we found in JSON format

    } catch (error) {
        res.status(404).json( {message: error.message}); // return failure status and message (404)
    }
}
 
export const createQuestion =  async (req, res) => {
    const { userId } = req.params; // req objects store params that they dynamically expect from the URL so we can access them through destructuring
    const question = req.body; // obtain the question from the req param
    console.log(userId);
    const newquestion = new QuestionMessage({...question}); // create a new instance of the QuestionMessage model using data from req
    console.log(newquestion);
    try {
        await newquestion.save() // CR(Update)D operation on the db using the model object 
        console.log()
        res.status(201).json(newquestion); // if success,  return the question in JSON
    } catch(error) {
        console.log('wtf');
        res.status(409).json( {message: error}); // return failure status and message (404)
    }
}

export const updateQuestion =  async (req, res) => {
    const { id: _id } = req.params; // req objects store params that they dynamically expect from the URL so we can access them through destructuring
    const question = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No question with that id');

    const updatedquestion = await QuestionMessage.findByIdAndUpdate(_id, {... question, _id}, { new: true});
    
    res.json(updatedquestion);
}


export const deleteQuestion = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No question with id: ${id}`);

    await QuestionMessage.findByIdAndDelete(id);

    res.json({ message: "question deleted successfully." });
}


export const UpdateNotesAndCode =  async (req, res) => {
    const { id: _id } = req.params; // req objects store params that they dynamically expect from the URL so we can access them through destructuring
    const { notes, code } = req.body;
    console.log(notes);
    console.log(code);
    const question = await QuestionMessage.findById(_id); // req body usually stores the data (in this case its the question), we have to assume that the front end sends in the question as part of the data, and then implement this on the front end later
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No question with that id');

    const updatedquestion = await QuestionMessage.findByIdAndUpdate(_id, {notes: notes, code:code}, { new: true});
    
    res.json(updatedquestion);
}

// // add some example posts directly here:
// async function createQuestions() {
//     const questions_ = [
//         {userId: '100396715511587280746', title: 'Contains Duplicate', difficulty: 'Easy', status: 'Solved', tags: ['Arrays and Hashing'], createdAt: '2024-08-19' },
//         {userId: '100396715511587280746',  title: 'Anagram', difficulty: 'Easy', status: 'Solved', tags: ['Arrays and Hashing'], createdAt: '2024-08-19' },
//         {userId: '100396715511587280746',  title: '2 Sum', difficulty: 'Easy', status: 'Solved', tags: ['Arrays and Hashing'], createdAt: '2024-08-19' },
//         {userId: '100396715511587280746',  title: 'Group Anagram', difficulty: 'Medium', status: 'Solved', tags: ['Arrays and Hashing'], createdAt: '2024-08-19' },
//         {userId: '100396715511587280746',  title: 'K Frequent Elements', difficulty: 'Medium', status: 'Solved', tags: ['Arrays and Hashing'], createdAt: '2024-08-19' },
//         {userId: '100396715511587280746',  title: 'Encode Decode', difficulty: 'Medium', status: 'Solved', tags: ['Arrays and Hashing'], createdAt: '2024-08-19' },
//         {userId: '100396715511587280746',  title: 'Palindrome String', difficulty: 'Easy', status: 'Solved', tags: ['Two Pointers'], createdAt: '2024-08-20' },
//         {userId: '100396715511587280746',  title: 'Stock 1', difficulty: 'Easy', status: 'Solved', tags: ['Two Pointers'], createdAt: '2024-08-20' },
//         {userId: '100396715511587280746',  title: 'Product of All Except Self', difficulty: 'Medium', status: 'Solved', tags: ['Arrays and Hashing'], createdAt: '2024-08-20' },
//         {userId: '100396715511587280746',  title: 'Longest Consecutive Elements', difficulty: 'Medium', status: 'Solved', tags: ['Arrays and Hashing'], createdAt: '2024-08-20' },
//         { userId: '100396715511587280746', title: 'Three Sum', difficulty: 'Medium', status: 'Solved', tags: ['Two Pointers'], createdAt: '2024-08-20' },
//         {userId: '100396715511587280746',  title: 'Container With Most Water', difficulty: 'Medium', status: 'Solved', tags: ['Two Pointers'], createdAt: '2024-08-20' },
//         {userId: '100396715511587280746',  title: 'Longest Substring Without Repeats', difficulty: 'Medium', status: 'Solved', tags: ['Sliding Window'], createdAt: '2024-08-20' },
//         { userId: '100396715511587280746', title: 'Minimum Window Substring', difficulty: 'Hard', status: 'Solved', tags: ['Sliding Window'], createdAt: '2024-08-21' },
//         {userId: '100396715511587280746',  title: 'Longest Repeating Character Replacement', difficulty: 'Medium', status: 'Solved', tags: ['Sliding Window'], createdAt: '2024-08-21' },
//         {userId: '100396715511587280746',  title: 'Valid Parenthesis', difficulty: 'Easy', status: 'Solved', tags: ['Stack'], createdAt: '2024-08-25' },
//         { userId: '100396715511587280746', title: 'Reverse List', difficulty: 'Easy', status: 'Solved', tags: ['Linked List'], createdAt: '2024-08-25' },
//         { userId: '100396715511587280746', title: 'Merge List', difficulty: 'Easy', status: 'Solved', tags: ['Linked List'], createdAt: '2024-08-25' },
//         {userId: '100396715511587280746',  title: 'Linked List Cycle', difficulty: 'Easy', status: 'Solved', tags: ['Linked List'], createdAt: '2024-08-25' },
//         { userId: '100396715511587280746', title: 'Merge K Lists', difficulty: 'Hard', status: 'Solved', tags: ['Linked List'], createdAt: '2024-08-25' },
//         { userId: '100396715511587280746', title: 'Minimum in Rotated Array', difficulty: 'Medium', status: 'Solved', tags: ['Binary Search'], createdAt: '2024-08-25' },
//         { userId: '100396715511587280746', title: 'Search in Rotated Array', difficulty: 'Medium', status: 'Solved', tags: ['Binary Search'], createdAt: '2024-08-25' },
//         { userId: '100396715511587280746', title: 'Reorder List', difficulty: 'Medium', status: 'Solved', tags: ['Linked List'], createdAt: '2024-08-25' },
//         { userId: '100396715511587280746', title: 'Remove Nth Node', difficulty: 'Medium', status: 'Solved', tags: ['Linked List'], createdAt: '2024-08-25' },
//         { userId: '100396715511587280746', title: 'Invert Tree', difficulty: 'Easy', status: 'Solved', tags: ['Trees'], createdAt: '2024-08-26' },
//         { userId: '100396715511587280746', title: 'Max Depth', difficulty: 'Easy', status: 'Solved', tags: ['Trees'], createdAt: '2024-08-26' },
//         { userId: '100396715511587280746', title: 'Same Tree', difficulty: 'Easy', status: 'Solved', tags: ['Trees'], createdAt: '2024-08-26' },
//         { userId: '100396715511587280746', title: 'Subtree', difficulty: 'Easy', status: 'Solved', tags: ['Trees'], createdAt: '2024-08-26' },
//         { userId: '100396715511587280746', title: 'Lowest Common Ancestor', difficulty: 'Medium', status: 'Solved', tags: ['BST'], createdAt: '2024-08-26' },
//         { userId: '100396715511587280746', title: 'Level Order Traversal Sort by Depth', difficulty: 'Medium', status: 'Solved', tags: ['BST'], createdAt: '2024-08-26' },
//         { userId: '100396715511587280746', title: 'Validate Tree', difficulty: 'Medium', status: 'Solved', tags: ['BST'], createdAt: '2024-08-26' },
//         { userId: '100396715511587280746', title: 'Kth Smallest Element', difficulty: 'Medium', status: 'Solved', tags: ['BST'], createdAt: '2024-08-26' },
//         { userId: '100396715511587280746', title: 'Construct Tree', difficulty: 'Medium', status: 'Solved', tags: ['BST'], createdAt: '2024-08-26' },
//         { userId: '100396715511587280746', title: 'Find Max Path Sum', difficulty: 'Hard', status: 'Solved', tags: ['BST'], createdAt: '2024-08-27' },
//         { userId: '100396715511587280746', title: 'Number of Islands', difficulty: 'Medium', status: 'Solved', tags: ['Graphs'], createdAt: '2024-08-27' },
//         { userId: '100396715511587280746', title: 'Clone Graph', difficulty: 'Medium', status: 'Solved', tags: ['Graphs'], createdAt: '2024-08-27' },
//         { userId: '100396715511587280746', title: 'Water Flow', difficulty: 'Medium', status: 'Solved', tags: ['Graphs'], createdAt: '2024-08-28' },
//       ];
      
  
//     // Iterate over each question and use the createQuestion function to save it
//     for (const question of questions_) {
//       try {
//         const savedQuestion = new QuestionMessage(question);  // Assuming createQuestion is an async function
//         await savedQuestion.save();
//         console.log('Question created successfully:', savedQuestion);
//       } catch (error) {
//         console.error('Error creating question:', error.message);
//       }
//     }
//   }
  
// createQuestions()