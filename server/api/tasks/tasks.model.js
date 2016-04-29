'use strict';
import mongoose from 'mongoose';

var userSchema = {
  _id: {
    type: [mongoose.Schema.Types.Mixed],
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'Employee',
    required: true
  },
  userSupervisors: [
    {
      SupervisorId: {
        type: Number
      }
    }
  ],  
  email: {
    type: String,
    lowercase: true,
    required: true
  }
}

var TasksSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  Status: {
    statusCode: {
      type: Number,
      required: true
    },
    statusName: {
      type: String,
      required: true
    },
    statusDescription: {
      type: String,
      required: true
    },
    statusIcon: {
      iconName: {
        type: String
      },
      iconClass: {
        type: String
      }
    }
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
    priorityName: { type: String, required: true },
    priorityNumber: { type: Number, required: true },
    priorityIcon: {
      iconName: { type: String, required: true },
      iconClass: { type: String, required: true }
    }
  },
  AssignBy: userSchema,
  AssignTo: [
    userSchema
  ],
  DoBeforeDate: {
    type: Date,
    required: true
  },
  AssignDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  EstimatedHours: {
    type: Number,
    required: true
  },
  TimeSpent: {
    type: Number,
    required: true
  }
});



export default mongoose.model('Tasks', TasksSchema);