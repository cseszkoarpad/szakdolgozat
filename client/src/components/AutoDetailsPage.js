import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {fetchAutos} from '../actions';
import '../styles/autoDetails.css'

class AutoDetailsPage extends Component {
    constructor() {
        super()
        this.state = {
            auto: {},
            error: null
        }
    }

    componentDidMount() {
        this.setState({auto: this.props.auto})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({auto: nextProps.auto})
    }

    async incrementLikes(id) {
        if (!this.props.auth) {
            this.setState({error: 'Ehhez a funkcióhoz be kell jelentkezni!'})
            return
        }
        await axios.put('/api/autos/likes', {id: id})
        this.setState({auto: {...this.state.auto, likes: this.state.auto.likes + 1}})
    }

    goToEditAutoPage(id) {
        if (!this.props.auth) {
            this.setState({error: 'Ehhez a funkcióhoz be kell jelentkezni!'})
            return
        }

        this.props.history.push(`/autos/${id}/edit`)
    }


    async deleteAuto(id) {
        if (!this.props.auth) {
            this.setState({error: 'Ehhez a funkcióhoz be kell jelentkezni!'})
            return
        }
        await axios.delete('/api/autos/delete', {data: {id: id}})
        this.props.fetchAutos()
        this.props.history.push('/')
    }

    convertPrice() {
        if (this.state.auto.ar) {
            return this.state.auto.ar.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        }
        return 0
    }

    convertUploadTime() {
        if (this.state.auto.feltoltve) {
            const date = this.state.auto.feltoltve.split('T')
            return date[0]
        }
        return ''
    }

    errorShowUp(errorMessage) {
        return (
            <div className="alert">
                <span className="closebtn" onClick={() => this.closeDialog()}>&times;</span>
                {errorMessage}
            </div>
        )
    }

    closeDialog() {
        this.setState({error: null})
    }

    render() {
        let {_id, kep, modell, marka, ev, allapot, kivitel, km, szin, tomeg, uzemanyag, hengerUrTartalom, teljesitmeny, hajtas, valto, leiras, likes} = this.state.auto
        return (
            <div className="container" style={{marginTop: '40px', marginBottom: '40px'}}>
                <div className="row">

                    <div className="error">
                        {this.state.error ? this.errorShowUp(this.state.error) : null}
                    </div>

                    <h6 className="title">{marka} - {modell}</h6>
                    <div className="col s7">
                        <img className="img"
                             src={kep ? kep : "http://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg"}
                             alt={`${marka}-${modell}`}/>
                        <ul className="points">
                            <li className="uploaded"><span>Feltöltve:</span>{this.convertUploadTime()}</li>
                            <li className="text"><span>Kedvelések:</span>{likes}</li>
                        </ul>
                    </div>
                    <div className="col s5">
                        <ul className="points">
                            <li className="text"><span>Ár:</span>{this.convertPrice()}<span className="unit">Ft</span>
                            </li>
                            <li className="text"><span>Évjárat:</span>{ev}</li>
                            <li className="text"><span>Állapot:</span>{allapot}</li>
                            <li className="text"><span>Kivitel:</span>{kivitel}</li>
                            <li className="text"><span>Km:</span>{km}</li>
                            <li className="text"><span>Szín:</span>{szin}</li>
                            <li className="text"><span>Tömeg:</span>{tomeg}<span className="unit">kg</span></li>
                            <li className="text"><span>Üzemanyag:</span>{uzemanyag}</li>
                            <li className="text"><span>Hengerűrtartalom:</span>{hengerUrTartalom}<span
                                className="unit">cc</span></li>
                            <li className="text"><span>Teljesítmény:</span>{teljesitmeny}<span
                                className="unit">le</span></li>
                            <li className="text"><span>Hajtás:</span>{hajtas}</li>
                            <li className="text"><span>Váltó:</span>{valto}</li>
                            <li className="desc"><span>Leírás:</span>{leiras}</li>

                            <button style={{margin: '10px', display: 'block', background: '#1565C0'}}
                                    className="waves-effect waves-light btn"
                                    onClick={() => this.incrementLikes(_id)}>Kedvelés <i
                                className="icon ion-thumbsup"></i></button>
                            <button style={{margin: '10px', display: 'block', background: '#4CAF50'}}
                                    className="waves-effect waves-light btn"
                                    onClick={() => this.goToEditAutoPage(_id)}>Szerkesztés <i
                                className="icon ion-edit"></i></button>
                            <button style={{margin: '10px', display: 'block', background: '#f44336'}}
                                    className="waves-effect waves-light btn"
                                    onClick={() => this.deleteAuto(_id)}>Törlés <i className="icon ion-trash-b"></i>
                            </button>

                        </ul>
                    </div>
                </div>
                {/* komment szekció */}
                <div className="comment-container">

                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const autoId = ownProps.match.params.id;
    const auto = Object.assign({}, state.autos.find(auto => auto._id === autoId))

    return {
        auto,
        auth: state.auth
    };
}

export default connect(mapStateToProps, {fetchAutos})(AutoDetailsPage)