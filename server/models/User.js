import mongoose from 'mongoose'

//mongoose'ta her veri modeli Schema ile türetilir.
const userSchema = new mongoose.Schema({
    code: { type: String, required: true },
    friends: { type: Array }
})

const User = mongoose.model("User", userSchema);

export default User