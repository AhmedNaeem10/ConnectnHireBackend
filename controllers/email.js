const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper

exports.signup = async (name, username, email) => {
    let info = await transporter.sendMail({
        from: 'mailerhere10@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Welcome to C&H", // Subject line
        html: `<div>
                    <h1>Thank you for joining Connect & Hire, ${name}</h1>
                    <p>Welcome to Upwork, the workplace for the world. Here are your account details for future reference:</p>
                    <p>Your username is: ${username}<br>
                    Forgot your password? Find it here</p>
                    <p>You’ve joined a talented community of independent professionals and agencies doing amazing work. With 100,000 clients and 3,000 freelance jobs posted daily on our platform, we’ve got unparalleled opportunities for you. To take advantage of them, start by setting up a great profile that markets yourself to prospective clients.</p>
                    <p>For tips on creating a polished, professional profile—and other useful information about freelancing on Upwork—check out A Freelancer’s Guide to Upwork.</p>
                    <p>Once your profile has been published, you’re ready to start connecting with clients.</p>
                    <p>In the meantime, browse our guide for more on getting started and tell us how you’d like to get paid by your clients. For additional information, inspiration, and help from your peers, visit our Connect & Hire Community forum.</p>
                    <p>Thanks again for joining us! We’re so happy to have you.</p>
                </div>`, // html body
    });
    console.log("Email sent: ", info.messageId)
}

exports.application_received = async (name, email, freelancer, title) => {
    let info = await transporter.sendMail({
        from: 'mailerhere10@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Your job post has applications!", // Subject line
        html: `<div>
                    <h1>Your job post has received an application, ${name}</h1>
                    <p>${freelancer} has applied for job post ${title}. Better to check it out!</p>
                </div>`, // html body
    });
    console.log("Email sent: ", info.messageId)
}

exports.application_accepted = async (name, email, client, title) => {
    let info = await transporter.sendMail({
        from: 'mailerhere10@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Your application has been accepted!", // Subject line
        html: `<div>
                    <h1>Your application has accepted, ${name}</h1>
                    <p>${client} has reviewed and accepted your application for job post ${title}. Better to start working now!</p>
                </div>`, // html body
    });
    console.log("Email sent: ", info.messageId)
}

exports.job_delivered = async (name, email, freelancer, title) => {
    let info = await transporter.sendMail({
        from: 'mailerhere10@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Your order has just been delivered!", // Subject line
        html: `<div>
                    <p>${freelancer} has just delivered your order for job post ${title}, ${name}. Better to review it now!</p>
                </div>`, // html body
    });
    console.log("Email sent: ", info.messageId)
}

exports.job_completed = async (name, email, client, title) => {
    let info = await transporter.sendMail({
        from: 'mailerhere10@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Your delivery has been accepted!", // Subject line
        html: `<div>
                    <h1>Your delivery has just been accepted, ${name}</h1>
                    <p>${client} has accepted your delivery for job post ${title}. Great job!</p>
                </div>`, // html body
    });
    console.log("Email sent: ", info.messageId)
}

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "mailerhere10@gmail.com", // generated ethereal user
        pass: "90260405575", // generated ethereal password
    },
});


// send mail with defined transport object


