import React from 'react'
import '../styles/footer.css'

const Footer = () => {
	return (
		<footer className="page-footer">
			<div className="container">
				<div className="row">
					<div className="col l6 s12">
						<h5 className="white-text">AutoReact</h5>
						<p className="grey-text text-lighten-4"> © 2018 Copyright</p>
					</div>
					<div className="col l4 offset-l2 s12">
						<h5 className="white-text">Links</h5>
						<ul>
							<li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
							<li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
							<li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
							<li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer