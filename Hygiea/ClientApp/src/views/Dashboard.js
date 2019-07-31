import React from "react";
import ConnectFailed from "../components/ConnectFailed";
import StatCards from "../components/StatCards";
import { $axios, handleError } from "../utilities/helper";

class Dashboard extends React.PureComponent {
	state = {
		serverUnavailable: false,
		complaintsCount: 0,
		pendingcomplaintsCount: 0,
		resolvedcomplaintsCount: 0
	};

	componentDidMount() {
		//Get Stats here
		this.fetchStats();
	}

	fetchStats() {
		$axios()
			.get("/api/comp/stats")
			.then(res => {
				const STATS = res.data;
				this.setState({
					complaintsCount: STATS.complaintsCount,
					pendingcomplaintsCount: STATS.pendingcomplaintCount,
					resolvedcomplaintsCount: STATS.resolvedcomplaintCount
				});
			})
			.catch(error => {
				this.setState({ serverUnavailable: true });
				handleError(error, this.props);
			});
	}

	render() {
		return (
			<>
				{this.state.serverUnavailable ? <ConnectFailed /> : null}
				<StatCards
					complaintsCount={this.state.complaintsCount}
					resolvedcomplaintsCount={this.state.resolvedcomplaintsCount}
					pendingcomplaintsCount={this.state.pendingcomplaintsCount}
				/>
			</>
		);
	}
}

export default Dashboard;
