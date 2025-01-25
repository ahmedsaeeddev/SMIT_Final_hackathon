import express from 'express';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerDocs from './swagger/swaggerDocs.js';
import dbConnect from './config/dbConfig.js';
// import authRoutes from './routes/authRoutes.js';
import router from './routes/crudRoutes.js';
import cors from 'cors'
import userRoute from './Users Acess/users.js';
import user from './models/User.js';
import userRoutes from './routes/userRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// cors config 
app.use(cors())

// 6795596de5f59ca4924940ad
// Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/data/', router);
// app.use('/api', userRoute);
app.use("/api/users", userRoutes); //DONE
app.use("/api/loans", loanRoutes);
app.use("/api/admin", adminRoutes);

// Default Route
app.get('/', (req, res) => {
    res.status(200).send('Welcome to Backend');
});

// Connect to DB and Start Server
dbConnect();

const createAdminUser = async () => {
    try {
        // Check if there's already an admin in the database
        const admin = await user.findOne({ email: 'ahmedsaeeddev0@gmail.com' });

        if (!admin) {
            // Admin doesn't exist, so create one
            const newAdmin = new user({
                username: 'admin',
                email: 'ahmedsaeeddev0@gmail.com',
                password: '01234567',  // Set a default password for the admin
                isAdmin: true,  // Set this user as an admin
            });

            await newAdmin.save();
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }
    } catch (err) {
        console.log('Error creating admin user:', err);
    }
};

// createAdminUser();

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
