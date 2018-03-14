import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { fetchAutos } from '../actions';
import '../styles/autoDetails.css'

import TextInput from './form/TextInput'

class AutoEditPage extends Component {
	constructor() {
		super()
		this.state = {
			auto: {}
		}

		this.onChange = this.onChange.bind(this)
		this.updateAuto = this.updateAuto.bind(this)
	}

	componentDidMount() {
		this.setState({ auto: this.props.auto })
	}

	onChange(event) {
    const field = event.target.name;
    const auto = this.state.auto;
    auto[field] = event.target.value;
    this.setState({ auto: auto });
  }

	async updateAuto(e) {
		e.preventDefault()
		const auto = this.state.auto
		await axios.put('/api/autos/edit', {
			id: auto._id,
			marka: auto.marka,
			modell: auto.modell,
			kep: auto.kep,
			ar: auto.ar,
			ev: auto.ev,
			allapot: auto.allapot,
			kivitel: auto.kivitel,
			km: auto.km,
			szin: auto.szin,
			tomeg: auto.tomeg,
			uzemanyag: auto.uzemanyag,
			hengerUrTartalom: auto.hengerUrTartalom,
			teljesitmeny: auto.teljesitmeny,
			hajtas: auto.hajtas,
			valto: auto.valto,
			leiras: auto.leiras
		})
		this.props.fetchAutos()
		this.props.history.push(`/autos/${this.state.auto._id}`)
	}

	async deleteAuto(id) {
		await axios.delete('/api/autos/delete', { data: { id: id } })
		this.props.fetchAutos()
		this.props.history.push('/')
	}

	render() {
		let { _id, kep, modell, marka, ar, ev, allapot, kivitel, km, szin, tomeg, uzemanyag, hengerUrTartalom, teljesitmeny, hajtas, valto, leiras, feltoltve, likes } = this.state.auto
		return (
			<div className="container">
				<div className="row">
					<h6 className="title">{marka} - {modell}</h6>
					<div className="col s7">
						<img className="img" src={kep ? kep : "http://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg"} alt={`${marka}-${modell}`}/>
						<ul className="points">
							<li className="uploaded"><span>Feltöltve:</span>{feltoltve}</li>
							<li className="text"><span>Kedvelések:</span>{likes}</li>					
						</ul>
					</div>
					<form onSubmit={this.updateAuto}>
						<div className="col s5">
							<ul className="points">
								<TextInput
									name="marka"
									label="Márka:"
									value={marka}
									onChange={this.onChange}/>

								<TextInput
									name="modell"
									label="Modell:"
									value={modell}
									onChange={this.onChange}/>

								<TextInput
									name="kep"
									label="Kép url:"
									value={kep}
									onChange={this.onChange}/>

								<TextInput
									name="ar"
									label="Ár:"
									value={ar}
									onChange={this.onChange}/>
								
								<TextInput
									name="ev"
									label="Évjárat:"
									value={ev}
									onChange={this.onChange}/>

								<TextInput
									name="allapot"
									label="Állapot:"
									value={allapot}
									onChange={this.onChange}/>

								<TextInput
									name="kivitel"
									label="Kivitel:"
									value={kivitel}
									onChange={this.onChange}/>

								<TextInput
									name="km"
									label="Km óra állása:"
									value={km}
									onChange={this.onChange}/>

								<TextInput
									name="szin"
									label="Szín:"
									value={szin}
									onChange={this.onChange}/>

								<TextInput
									name="tomeg"
									label="Tömeg:"
									value={tomeg}
									onChange={this.onChange}/>

								<TextInput
									name="uzemanyag"
									label="Üzemanyag:"
									value={uzemanyag}
									onChange={this.onChange}/>
								
								<TextInput
									name="hengerUrTartalom"
									label="Hengerűrtartalom:"
									value={hengerUrTartalom}
									onChange={this.onChange}/>

								<TextInput
									name="teljesitmeny"
									label="Teljesítmény:"
									value={teljesitmeny}
									onChange={this.onChange}/>

								<TextInput
									name="hajtas"
									label="Hajtás:"
									value={hajtas}
									onChange={this.onChange}/>

								<TextInput
									name="valto"
									label="Váltó:"
									value={valto}
									onChange={this.onChange}/>

								<div className="form-group">
									<label htmlFor="leiras">Leírás:</label>
									<textarea type="text" rows="15" cols="150" maxLength="400" name="leiras" value={leiras} onChange={this.onChange} />
								</div>
								
								<button type="submit" className="waves-effect waves-light btn">Mentés <i className="material-icons">save</i></button>
								<button className="waves-effect waves-light btn"><Link style={{ color: 'white' }} to={`/autos/${_id}`}>Mégse <i className="material-icons">arrow_back</i></Link></button>								
								<button className="waves-effect waves-light btn" onClick={() => this.deleteAuto(_id)}>Törlés <i className="material-icons">delete</i></button>
				
							</ul>	
						</div>
					</form>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
  const autoId = ownProps.match.params.id;
	const auto = Object.assign({}, state.autos.find(auto => auto._id === autoId))
  return {
		auto
	};
}

export default connect(mapStateToProps, { fetchAutos })(AutoEditPage)