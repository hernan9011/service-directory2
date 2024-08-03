// src/components/ServiceList.jsx
import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import ServiceModal from './ServiceModal';

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      const serviceCollection = collection(db, 'services');
      const serviceSnapshot = await getDocs(serviceCollection);
      const serviceList = serviceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServices(serviceList);
    };
    fetchServices();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input type="text" value={search} onChange={handleSearch} placeholder="Search services..." />
      <ul>
        {filteredServices.map(service => (
          <li key={service.id} onClick={() => setSelectedService(service)}>
            {service.name}
          </li>
        ))}
      </ul>
      {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}
    </div>
  );
}
