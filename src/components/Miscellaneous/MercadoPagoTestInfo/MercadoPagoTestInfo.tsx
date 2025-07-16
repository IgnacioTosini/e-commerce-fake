import React from 'react';
import './mercadoPagoTestInfo.scss';

export const MercadoPagoTestInfo: React.FC = () => {
  return (
    <div className="mpTestInfo">
      <h4>Datos de prueba para Mercado Pago</h4>
      <div className="mpTestInfo__alert">
        <strong>⚠️ Importante para pruebas:</strong>
        <ul>
          <li>Abre el checkout de MercadoPago en una <b>ventana de incógnito</b> o navegador diferente.</li>
          <li>Si ya tienes una sesión real abierta, puede que no funcione correctamente.</li>
        </ul>
      </div>
      <ul className="mpTestInfo__data">
        <li><strong>Usuario de prueba:</strong> TESTUSER629249420</li>
        <li><strong>Contraseña:</strong> LUojNU296l</li>
        <li><strong>Tarjeta de prueba:</strong> 5031 7557 3453 0604</li>
        <li><strong>Vencimiento:</strong> 11/30</li>
        <li><strong>CVV:</strong> 123</li>
      </ul>
      <p>Utiliza estos datos solo para pruebas. <br />Nunca uses tus datos reales.</p>
    </div>
  );
};
