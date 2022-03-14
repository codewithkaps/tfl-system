import { Alert, Table, Container, Row } from 'react-bootstrap';
import CycleHire from '../cycle-hire/CycleHire';
import { useParams } from "react-router-dom";

function Service(props: any) {
	const { id } = useParams();

	const getServiceDisruptionStatus = (service: any) => {
		const isServiceDisruption = !!service["lineStatuses"] ? service["lineStatuses"].filter((record: any) => record["statusSeverity"] !== 10) :  false;
		return (!!isServiceDisruption && isServiceDisruption.length > 0);
	}

	const isServiceDisrupted = getServiceDisruptionStatus(props.state.selectedService);
	const isCycleHire = !!id && id.indexOf('cycle-hire') > -1;

	const getStatusMessage = () => {
		let message = isServiceDisrupted ? 'Service currently suffering disruptions' : 'No service disruptions';
		return message;
	}

	const getDisruptionReasons = (service: any) => {
		if (!!isServiceDisrupted && !!service["lineStatuses"]) {
			return service["lineStatuses"].map((record: any) => {
				if (record["statusSeverity"] !== 10) {
					return (
						<tr>
							<td>{record["reason"]}</td>
						</tr>
					)
				}
				return;
			});
		}
	}

	return (
		<Container>
			{!isCycleHire && <Row>
				<Alert variant={isServiceDisrupted ? 'danger' : 'success'}>
					<Alert.Heading>{getStatusMessage()}</Alert.Heading>
				</Alert>
				{isServiceDisrupted && <Table striped bordered hover size="sm">
					<thead>
					<tr>
						<th>Resaon</th>
					</tr>
					</thead>
					<tbody>
						{getDisruptionReasons(props.state.selectedService)}
					</tbody>
				</Table>}
			</Row>}

			{isCycleHire && <Row>
				<CycleHire state={props.state}></CycleHire>
			</Row>}
		</Container>
	);
}

export default Service;
