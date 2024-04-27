import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Container, Form, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import PieChart from './components/PieChart';
import Info from './components/Info';
import Gauge from './components/Gauge.js';
import MarkerMap from './components/MarkerMap.js';

function App() {
  const [countryName, setCountryName] = useState('');
  const [showComponents, setShowComponents] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastSavedCountry, setLastSavedCountry] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    getLastSavedCountry();
  }, []);

  const getLastSavedCountry = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:30001/getLastSavedCountryInfo');
      console.log('Last saved country:', response.data);
      setLastSavedCountry(response.data);
      const labels = response.data.languages.map(lang => lang);
      const data = response.data.languages.map(() => response.data.languages.length); // Dummy data, change according to your requirements
      setPieChartData({
        labels: labels,
        datasets: [{
          label: 'Languages Spoken',
          data: data,
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#f3ba2f",
            "#50AF95",
            "#2a71d0",
            "#ecf0f1",
          ],
          borderColor: "black",
          borderWidth: 2,
        }]
      });
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
      console.error('Error fetching last saved country information:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:30001/fetchAndSaveCountryInfo?countryName=${countryName}`);
      console.log(response.data.message);
      setShowComponents(true);
      getLastSavedCountry(); // Fetch the last saved country information after saving a new country
    } catch (error) {
      setLoading(false);
      console.error('Error submitting country name:', error);
    }
  };

  const handleChange = (event) => {
    setCountryName(event.target.value);
  };

  return (
    <div>
      <Container className='mt-5 d-flex justify-content-center align-items-center'>
        <Row className='d-flex justify-content-center align-items-center'>

          <Form onSubmit={handleSubmit} className="d-flex align-items-center">
            <Form.Group controlId="countryName" className="mr-2 mb-0">
              <Form.Control
                type="text"
                value={countryName}
                onChange={handleChange}
                placeholder="Enter country name"
              />
            </Form.Group>
            <Button className='mx-3' variant="primary" type="submit">
              {loading ? <Spinner animation="border" variant="light" size="sm" /> : 'Search'}
            </Button>
          </Form>
        </Row>
      </Container>
      {
        showComponents && lastSavedCountry && (
          <div>
            <Container>
              <Row className='justify-content-center align-items-center'>
                <Col lg={5} md={12} sm={12} className='d-flex px-5 m-3 justify-content-between align-items-center box'>
                  <Info {...lastSavedCountry} />
                </Col>
                <Col lg={5} md={12} sm={12} className='d-flex justify-content-center align-items-center box'>
                  <Gauge level={lastSavedCountry.populationCategory} />
                </Col>
              </Row>
              <Row className='justify-content-center align-items-center' >
                <Col lg={5} md={12} sm={12} className='m-3 d-flex justify-content-center align-items-center box'>
                  {pieChartData && <PieChart data={pieChartData} />}
                </Col>
                <Col lg={5} md={12} sm={12} className='d-flex justify-content-center align-items-center box'>
                  <MarkerMap latitude={lastSavedCountry.latitude} longitude={lastSavedCountry.longitude} />
                </Col>
              </Row>
            </Container>
          </div>
        )
      }
    </div >
  );
}

export default App;