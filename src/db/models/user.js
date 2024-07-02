// src/db/models/UserActivation.js

import { model, Schema } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from '../models/hooks.js';

const userSchema = new Schema(
    {
        name: { type: String, required: true, },
        email: { type: String, required: true, unique: true, },
        password: { type: String, required: true, },
    },
    { timestamps: true, versionKey: false, },
);

userSchema.post('save', mongooseSaveError);

userSchema.pre('findOneAndUpdate', setUpdateSettings);

userSchema.post('findOneAndUpdate', mongooseSaveError);

export const User = model('user', userSchema);


