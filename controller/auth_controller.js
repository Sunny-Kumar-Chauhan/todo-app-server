const userModel = require('../db/Usermodel');
//const sendMail = require('../utils/sendMail');
const sendToken = require('../utils/sendToken');
const bcrypt = require('bcrypt')

const auth_controller = {

    register: async (req, res) => {


        try {
            const { name, email, password } = req.body;

            //const { avatar } = req.files;
            if (!name || !email || !password) {
                return res.status(422).json("Please fill all credentials");
            }

            const isExist = await userModel.findOne({ email: email });

            if (isExist) {
                return res.status(400).send("This email has already been taken")

            }

            // const otp = Math.floor(Math.random() * 1000000)

            const user = await userModel.create({
                name,
                email,
                password,
                avatar: {
                    public_id: "",
                    url: ""
                },

            })
            // await sendMail(email, "Verify your account", "Your OTP is ${otp}")

            sendToken(res, user, 200, "Registerd Successfully ")
        } catch (error) {
            return res.status(400).send("Something went wrong !")
        }


    },
    login: async (req, res) => {


        try {
            const { email, password } = req.body;

            //const { avatar } = req.files;
            if (!email || !password) {
                return res.status(422).json("Please fill all credentials");
            }

            const user = await userModel.findOne({ email: email });

            if (!user) {
                return res.status(400).send("UserName or Password wrong!")

            }
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).send("UserName or Password wrong!")

            }
            sendToken(res, user, 200, "Logged In Successfully ")


            // const otp = Math.floor(Math.random() * 1000000)


            // await sendMail(email, "Verify your account", "Your OTP is ${otp}")


        } catch (error) {
            return res.status(400).send("Something went wrong !")
        }


    },

    logout: async (req, res) => {

        res.status(200).cookie('token', "").json({
            success: false,
            message: "Logged out",
            user: null
        })
    },


    verify: (req, res) => {
        const user = req.user;
        sendToken(res, user, 200, "verified")
    },


    addTask: async (req, res) => {
        try {

            const { title, description } = req.body;

            const user = await userModel.findById(req.user._id)

            //console.log(user)
            user.tasks.push({
                title,
                description,
                completed: false,
                createdAt: new Date(Date.now())
            })

            await user.save();
            res.status(200).json({
                success: true,
                message: "Task added successfully"
            })

        } catch (error) {
            return res.status(400).send("Something went wrong")
        }


    },

    deleteTask: async (req, res) => {
        try {

            const { index } = req.params;

            const user = await userModel.findById(req.user._id)

        
            user.tasks.splice(index, 1)

            await user.save();
            res.status(200).json({
                success: true,
                message: "Task deleted successfully"
            })

        } catch (error) {
            return res.status(400).send(error.message)
        }


    },

    updateTask: async (req, res) => {
        try {

            const { taskId } = req.params;
           

            const user = await userModel.findById(req.user._id)

            
            user.task = await user.tasks.find(
                (task) => task._id.toString() === taskId.toString()
              );
          
         

            user.task.completed = !user.task.completed

            await user.save();

            res.status(200).json({
                success: true,
                message: "Task updated successfully"
            })

        } catch (error) {
            return res.status(400).send(error.message)
        }


    }




}

module.exports = auth_controller