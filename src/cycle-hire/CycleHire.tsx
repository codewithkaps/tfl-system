import { Alert, Table, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function CycleHire(props: any) {

  const [searchText, setSearchText] = useState('');
  const [locations, setLocations] = useState([]);
  const [cache, setCache] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        if (!cache) {
          const obj: any = {};
          setCache(obj);
        }
        if (!!searchText && searchText.length && !!cache) {
          if (!cache[searchText]) {
            const response = await fetch(`https://api.tfl.gov.uk/BikePoint/Search?query=${searchText}`);
            if (response.ok) {
              const data: any = await response.json();
              const obj: any = {};
              obj[searchText] = data;
              const newCache: any = Object.assign(cache, obj)
              setCache(newCache);
            }
          }
          setLocations(cache[searchText]);
        }
      } catch (err) {
        console.log(err)
      }
    };
    getData();
  }, [searchText]);

  const handleChange = (event: any) => {
    event.preventDefault();
    setSearchText(event.target.value);
  }

  const getBikePoints = () => {
    return locations.map((record: any) => {
      const regex = /[^_]*$/;
      const bikeid = record['id'].match(regex) || [];
      const bikepoint = `${bikeid.length ? bikeid[0] : ''} ${record["commonName"]} (${record["lat"]}, ${record["lon"]})`;
      return (
        <tr>
          <td>{bikepoint}</td>
        </tr>
      )
    });
  }

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicSearch">
          <Form.Label>Enter any location</Form.Label>
          <Form.Control type="text" placeholder="Search location" value={searchText} onChange={handleChange} />
        </Form.Group>
      </Form>

      {locations.length === 0 && <Alert variant="danger">
        <Alert.Heading>{`No bike points found for ${searchText}`}</Alert.Heading>
      </Alert>}

      {locations.length > 0 && <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Bike Points</th>
          </tr>
        </thead>
        <tbody>
          {getBikePoints()}
        </tbody>
      </Table>}
    </>
  );
}

export default CycleHire;
