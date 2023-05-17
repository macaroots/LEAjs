new class send {
	async act(mailData, resolve, reject) {
		const agent = this.agent;
		try {
    		const nodemailer = (await import("nodemailer")).default;
    
            // Configurar o transporte SMTP
            let transporter = nodemailer.createTransport({
              host: process.env.SMTP || "smtp.gmail.com",
              port: process.env.SMPT_PORT || 587,
              secure: false,
              auth: {
                user: process.env.EMAIL.split('@')[0],
                pass: process.env.EMAIL_PASSWORD,
              },
            });
            
            // Configurar o e-mail a ser enviado
            let mailOptions = {
              from: process.env.EMAIL,
              to: await agent.see('getEmailTo'),
              subject: await agent.see('getEmailSubject'),
              text: await agent.see('getEmailText', mailData),
            };
            
            // Enviar o e-mail
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                reject(error);
              } else {
                resolve("E-mail enviado: " + info.response);
              }
            });
    
    		resolve();
		} catch (e) {
		    reject(e);
		}
	}
}();
