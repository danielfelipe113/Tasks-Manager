'use strict';

import mongoose from 'mongoose';

var CommonSchema = new mongoose.Schema({
  none: {
      yet: String
    }
});


export default mongoose.model('Common', CommonSchema);