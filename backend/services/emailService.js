
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // O el servicio que uses
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendOrderConfirmationEmail(order) {
    const recipient = order.userEmail || order.user?.email;
    if (!recipient) {
        throw new Error('No se encontró un email válido en la orden para enviar el correo.');
    }
    const mailOptions = {
        from: '"Tu Tienda" <no-reply@tutienda.com>',
        to: recipient,
        subject: '¡Compra realizada con éxito!',
        html: `
            <h2>¡Gracias por tu compra!</h2>
            <p>Tu orden <b>${order.id}</b> ha sido confirmada.</p>
            <ul>
                ${order.items.map(item => `<li>${item.title} x${item.quantity}</li>`).join('')}
            </ul>
            <p>Total: $${order.total}</p>
        `
    };
    await transporter.sendMail(mailOptions);
}

module.exports = { sendOrderConfirmationEmail };