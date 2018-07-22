import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {deleteAuto, fetchAutos, incrementLikes} from '../actions/auto';
import {fetchComments, submitComment} from '../actions/comment';
import Loader from '../components/Loader';
import '../styles/autoDetails.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

class AutoDetailsPage extends Component {
  state = {
    text: '',
    error: null
  };

  componentDidMount() {
    this.props.fetchComments();
  }

  //TODO: handleerrorból kiszedni és azzal lekezelni ezt
  async incrementLikes(id) {
    if (!this.props.auth) {
      this.setState({error: 'Ehhez a funkcióhoz be kell jelentkezni!'});
      return;
    }
    this.props.incrementLikes(id);
  }

  goToEditAutoPage(id) {
    if (!this.props.auth) {
      this.setState({error: 'Ehhez a funkcióhoz be kell jelentkezni!'});
      return;
    }

    this.props.history.push(`/autos/${id}/edit`);
  }


  deleteAuto(id) {
    if (!this.props.auth) {
      this.setState({error: 'Ehhez a funkcióhoz be kell jelentkezni!'});
      return;
    }
    this.props.deleteAuto(id);
    this.props.history.push('/');
  }

  convertPrice(ar) {
    if (ar) {
      return ar.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }
    return 'Nincs megadva';
  }

  convertUploadTime(date) {
    return date.split('T')[0];
  }

  errorShowUp(errorMessage) {
    return (
      <div className="alert">
        <span className="closebtn" onClick={() => this.closeDialog()}>&times;</span>
        {errorMessage}
      </div>
    );
  }

  closeDialog() {
    this.setState({error: null});
  }

  renderComments = (auto) => {
    let comments = [];
    let commentsNum = 0;
    if (auto._comments.length) {
      this.props.comments.map(comment => {
        return auto._comments.forEach(thisAutoComment => {
          if (thisAutoComment === comment._id) {
            let commentObject = Object.assign({}, comment);
            comments.unshift(commentObject);
            commentsNum++;
          }
        });
      });
    }
    return (
      <div className="comments">
        <h5>{commentsNum} hozzászólás</h5>
        {comments.map((comment, i) => {
          return (
            <div className="comment" key={i} style={{margin: '20px'}}>
              <img src={comment.picture} alt={`${comment.name} profile`} style={{width: '50px'}}/>
              <strong>{comment.name}</strong> - {comment.text}
            </div>
          );
        })}
      </div>
    );
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    console.log(this.state.text)
  };

  submitComment = (autoId) => {
    if (this.props.auth) {
      this.props.submitComment(this.props.auth._id, autoId, this.props.auth.name, this.state.text);
    } else {
      this.setState({error: 'Ehhez a funkcióhoz be kell jelentkezni!'});
      document.documentElement.scrollTop = 0;
    }
  };

  render() {
    const autoId = this.props.match.params.id;
    const auto = this.props.autos.find(auto => auto._id === autoId);
    if (auto) {
      let {_id, feltoltve, kep, modell, marka, ar, ev, allapot, kivitel, km, szin, tomeg, uzemanyag, hengerUrtartalom, teljesitmeny, hajtas, valto, leiras, likes} = auto;
      return (
        <Paper>
          <Grid container>
            <Grid item xs={12}>
              <div className="error">
                {this.state.error ? this.errorShowUp(this.state.error) : null}
              </div>
            </Grid>
            <Grid item xs={4}>
              <h6 className="title">{marka} - {modell}</h6>
              <img className="img"
                   src={kep ? kep : 'http://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg'}
                   alt={`${marka}-${modell}`}/>
              <ul className="points">
                <li className="uploaded"><span>Feltöltve:</span>{this.convertUploadTime(feltoltve)}</li>
                <li className="text"><span>Kedvelések:</span>{likes}</li>
              </ul>
            </Grid>
            <Grid item xs={8}>
              <ul className="points">
                <li className="text"><span>Ár:</span>{this.convertPrice(ar)}<span className="unit">Ft</span></li>
                <li className="text"><span>Évjárat:</span>{ev}</li>
                <li className="text"><span>Állapot:</span>{allapot}</li>
                <li className="text"><span>Kivitel:</span>{kivitel}</li>
                <li className="text"><span>Km:</span>{km}</li>
                <li className="text"><span>Szín:</span>{szin}</li>
                <li className="text"><span>Tömeg:</span>{tomeg}<span className="unit">kg</span></li>
                <li className="text"><span>Üzemanyag:</span>{uzemanyag}</li>
                <li className="text"><span>Hengerűrtartalom:</span>{hengerUrtartalom}<span
                  className="unit">cc</span></li>
                <li className="text"><span>Teljesítmény:</span>{teljesitmeny}<span
                  className="unit">le</span></li>
                <li className="text"><span>Hajtás:</span>{hajtas}</li>
                <li className="text"><span>Váltó:</span>{valto}</li>
                <li className="desc"><span>Leírás:</span>{leiras}</li>

                <Button onClick={() => this.incrementLikes(_id)}>Kedvelés</Button>
                <Button onClick={() => this.goToEditAutoPage(_id)}>Szerkesztés</Button>
                <Button onClick={() => this.deleteAuto(_id)}>Törlés</Button>
              </ul>
            </Grid>
            <Grid item xs={12}>
              <div className="comment-container">
                {this.renderComments(auto)}
                <form onSubmit={this.submitComment}>
                  <TextField
                    label="Hozzászólás"
                    value={this.state.text}
                    onChange={this.handleChange('text')}
                    margin="normal"
                  />
                  <Button>Hozzászólok</Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </Paper>
      );
    } else {
      return <Loader/>;
    }
  }
}

const mapStateToProps = ({autos, auth, comments}) => {
  return {
    autos,
    auth,
    comments
  };
};

export default connect(mapStateToProps, {
  fetchAutos,
  incrementLikes,
  deleteAuto,
  fetchComments,
  submitComment
})(AutoDetailsPage);