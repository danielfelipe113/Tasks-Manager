'use strict';

import mongoose from 'mongoose';

var TaskPrioritiesSchema = new mongoose.Schema({
  TextualName: {
    type: String,
    required: true
  },
  PriorityId: {
    type: Number,
    required: true
  }
});

export default mongoose.model('TaskPriorities', TaskPrioritiesSchema);