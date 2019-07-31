import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { withRouter } from "react-router";

function StatCards(props) {
	return (
		<>
			<div className="header">
				<Container fluid>
					<div className="header-body">
						{/* Card stats */}
						<Row>
							<Col lg="6" xl="3">
								<Card className="shadow card-stats mb-4 mb-xl-0">
									<CardBody>
										<Row>
											<div className="col">
												<CardTitle tag="h6" className="text-uppercase text-muted mb-0">
													Total Complaints
												</CardTitle>
												<span className="h2 font-weight-bold mb-0">
													{props.complaintsCount}
												</span>
											</div>
											<Col className="col-auto">
												<div className="icon icon-shape bg-danger text-white rounded-circle shadow">
													<i className="fas fa-chart-bar" />
												</div>
											</Col>
										</Row>
										<p className="mt-3 mb-0 text-muted text-sm">
											<Link to="/portal/complaints" className="text-nowrap">
												Add new complaint
											</Link>
										</p>
									</CardBody>
								</Card>
							</Col>
							<Col lg="6" xl="3">
								<Card className="shadow card-stats mb-4 mb-xl-0">
									<CardBody>
										<Row>
											<div className="col">
												<CardTitle tag="h6" className="text-uppercase text-muted mb-0">
													Resolved Complaints
												</CardTitle>
												<span className="h2 font-weight-bold mb-0">
													{props.resolvedcomplaintsCount}
												</span>
											</div>
											<Col className="col-auto">
												<div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
													<i className="fas fa-users" />
												</div>
											</Col>
										</Row>
										<p className="mt-3 mb-0 text-muted text-sm">
											<Link to="/portal/resolvedcomplaints" className="text-nowrap">
												View
											</Link>
										</p>
									</CardBody>
								</Card>
							</Col>
							<Col lg="6" xl="3">
								<Card className="shadow card-stats mb-4 mb-xl-0">
									<CardBody>
										<Row>
											<div className="col">
												<CardTitle tag="h6" className="text-uppercase text-muted mb-0">
													Pending Complaints
												</CardTitle>
												<span className="h2 font-weight-bold mb-0">
													{props.pendingcomplaintsCount}
												</span>
											</div>
											<Col className="col-auto">
												<div className="icon icon-shape bg-warning text-white rounded-circle shadow">
													<i className="fas fa-chart-pie" />
												</div>
											</Col>
										</Row>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</div>
				</Container>
			</div>
		</>
	);
}

export default withRouter(StatCards);
