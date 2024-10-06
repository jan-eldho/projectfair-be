const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected Successfully');
}).catch((err) => {
    console.error('MongoDB Connection Failed:', err.message);
});
