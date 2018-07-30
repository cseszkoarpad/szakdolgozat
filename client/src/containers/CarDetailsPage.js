import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteCar, fetchCars, fetchCarById, incrementLikes} from '../actions/car';
import {fetchComments, submitComment} from '../actions/comment';
import Loader from '../components/Loader';
import '../styles/carDetails.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Search from '../components/Search';
import {withStyles} from '@material-ui/core';

const styles = {
  search: {
    padding: '10px',
  },
  container: {
    padding: '0px 20px',
  },
};

class CarDetailsPage extends Component {
  state = {
    text: '',
    error: null,
  };


  componentDidMount() {
    this.props.fetchCarById(this.props.match.params.id);
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

  goToEditCarPage(id) {
    if (!this.props.auth) {
      this.setState({error: 'Ehhez a funkcióhoz be kell jelentkezni!'});
      return;
    }

    this.props.history.push(`/cars/${id}/edit`);
  }


  deleteCar(id) {
    if (!this.props.auth) {
      this.setState({error: 'Ehhez a funkcióhoz be kell jelentkezni!'});
      return;
    }
    this.props.deleteCar(id);
    this.props.history.push('/');
  }

  convertPrice = (ar) => {
    if (ar) {
      return ar.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
    }
    return 'Nincs megadva';
  };

  convertUploadTime = (date) => {
    return date.split('T')[0];
  };

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

  renderComments = (car) => {
    let comments = [];
    let commentsNum = 0;
    if (car._comments.length) {
      this.props.comments.map(comment => {
        return car._comments.forEach(thisCarComment => {
          if (thisCarComment === comment.id) {
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
    console.log(this.state.text);
  };

  submitComment = (carId) => {
    if (this.props.auth) {
      this.props.submitComment(this.props.auth.id, carId, this.props.auth.name, this.state.text);
    } else {
      this.setState({error: 'Ehhez a funkcióhoz be kell jelentkezni!'});
      document.documentElement.scrollTop = 0;
    }
  };

  render() {
    const {classes, cars} = this.props;

    if (Object.keys(cars).length > 0) {
      let {id, feltoltve, kep, modell, marka, ar, ev, allapot, kivitel, km, szin, tomeg, uzemanyag, hengerUrtartalom, teljesitmeny, hajtas, valto, leiras, likes} = cars;
      return (
        <Grid container spacing={8}>
          <Grid item xs={2}>
            <Paper className={classes.search}>
              <Search/>
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.container}>
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
                    <li className="uploaded"><span>Feltöltve:</span>{feltoltve && this.convertUploadTime(feltoltve)}</li>
                    <li className="text"><span>Kedvelések:</span>{likes}</li>
                  </ul>
                </Grid>
                <Grid item xs={8}>
                  <ul className="points">
                    <li className="text"><span>Ár:</span>{ar && this.convertPrice(ar)}<span className="unit">Ft</span></li>
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

                    <Button onClick={() => this.incrementLikes(id)}>Kedvelés</Button>
                    <Button onClick={() => this.goToEditCarPage(id)}>Szerkesztés</Button>
                    <Button onClick={() => this.deleteCar(id)}>Törlés</Button>
                  </ul>
                </Grid>
                <Grid item xs={12}>
                  <div className="comment-container">
                    {cars._comments && this.renderComments(cars)}
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
          </Grid>
        </Grid>
      );
    } else {
      return <Loader/>;
    }
  }
}

const mapStateToProps = ({cars, auth, comments}) => {
  return {
    cars,
    auth,
    comments,
  };
};

export default connect(mapStateToProps, {
  fetchCars,
  fetchCarById,
  incrementLikes,
  deleteCar,
  fetchComments,
  submitComment,
})(withStyles(styles)(CarDetailsPage));