// src/components/ServiceModal.jsx
import PropTypes from 'prop-types';

export default function ServiceModal({ service, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{service.name}</h2>
        <p>{service.description}</p>
        <a href={`https://wa.me/${service.phone}`} target="_blank" rel="noopener noreferrer">Contactar por WhatsApp</a>
        <a href={`tel:${service.phone}`}>Llamar</a>
        <a href={`mailto:${service.email}`}>Email</a>
      </div>
    </div>
  );
}

ServiceModal.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
