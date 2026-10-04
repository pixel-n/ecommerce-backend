const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'customer' }
});
const User = mongoose.model('User', userSchema);

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@techhub.pk',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Muhammad Ali',
    email: 'ali@example.pk',
    password: 'user123',
    role: 'customer'
  }
];

// Inside your seed function:
await User.deleteMany({});
await User.insertMany(sampleUsers);
console.log('Users seeded into MongoDB!');