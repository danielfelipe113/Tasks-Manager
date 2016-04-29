'use strict';

import mongoose from 'mongoose';

var TasksSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Comments: {
    type: String,
    required: true
  },
  Priority: {
    type: String,
    required: true
  },
  AssignBy: {
    type: String,
    required: true
  },
  AssignTo: {
    type: String,
    required: true
  },
  DoBeforeDate: {
    type: Number,
    required: true
  },
  AssignDate: {
    type: Number,
    required: true
  },
  EstimatedHours: {
    type: Number,
    required: true
  },
  TimeSpent: {
    type: Number,
    required: true
  },
});

export default mongoose.model('Tasks', TasksSchema);