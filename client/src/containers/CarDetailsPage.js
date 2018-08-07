import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteCar, fetchCarById, fetchCars, getLikesCount, incrementLikes} from '../actions/car';
import {fetchComments, submitComment} from '../actions/comment';
import Loader from '../components/Loader';
import '../styles/carDetails.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Search from '../components/Search';
import LikeIcon from '@material-ui/icons/ThumbUp';
import {withStyles} from '@material-ui/core';
import {isCarFromUser} from '../actions/user';

const styles = {
  search: {
    padding: '10px',
  },
  container: {
    padding: '0px 20px',
  },
  carImg: {
    maxWidth: '100%',
  },
  commentImg: {
    borderRadius: '50%',
  },
};

class CarDetailsPage extends Component {
  state = {
    text: '',
    error: null,
  };

  componentWillMount() {
    this.props.fetchCarById(this.props.match.params.id);
  }

  componentDidMount() {
    this.props.fetchComments(this.props.match.params.id);
    if (this.props.auth) {
      this.props.isCarFromUser(this.props.match.params.id, this.props.auth.id);
    }
    this.props.getLikesCount(this.props.match.params.id)
  }

  incrementLikes = () => {
    if (!this.props.auth) {
      return this.setState({error: 'A kedveléshez be kell jelentkezni!'});
    }

    const data = {
      carId: this.props.match.params.id,
      userId: this.props.auth.id,
    };

    this.props.incrementLikes(data);
  };

  deleteCar = (carId) => {
    const {auth} = this.props;
    if (!auth) {
      this.setState({error: 'Ehhez a funkcióhoz be kell jelentkezni!'});
      return;
    }
    this.props.deleteCar(carId, auth.id);
    this.props.history.push('/');
  };

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

  renderComments = () => {
    const {classes} = this.props;
    let commentsNum = this.props.comments.length;

    return (
      <div className="comments">
        <h5>{commentsNum} hozzászólás</h5>
        {commentsNum > 0 && this.props.comments.map((comment, i) => {
          return (
            <div className="comment" key={i} style={{margin: '20px'}}>
              <img className={classes.commentImg} src={comment.profilePic} alt={`${comment.name} profile`}/>
              <strong>{comment.name}</strong> - {comment.text}
              <span className="date">{this.convertUploadTime(comment.feltoltve)}</span>
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
  };

  submitComment = (event) => {
    event.preventDefault();
    if (!this.props.auth) {
      this.setState({error: 'Ehhez a funkcióhoz be kell jelentkezni!'});
      document.documentElement.scrollTop = 0;
      return;
    }

    this.props.submitComment(this.props.auth.id, this.props.match.params.id, this.state.text, this.props.auth.name, this.props.auth.profilePic);
    this.setState({text: ''});
  };

  render() {
    const {classes, cars, auth} = this.props;

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
                  <h1 className="title">{marka} - {modell}</h1>
                  <img className={classes.carImg}
                       src={kep ? kep : 'http://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg'}
                       alt={`${marka}-${modell}`}/>
                  <span>Feltöltve:</span>{feltoltve && this.convertUploadTime(feltoltve)}
                  <Button variant="contained" color="primary" onClick={this.incrementLikes}>
                    {likes}<LikeIcon/>
                  </Button>
                </Grid>
                <Grid item xs={8}>
                  <ul className="points">
                    <li className="text"><span>Ár:</span>{ar && this.convertPrice(ar)}<span className="unit">Ft</span>
                    </li>
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
                    {auth.isCarFromUser && [
                      <Button onClick={() => this.props.history.push(`/cars/${id}/edit`)}>Szerkesztés</Button>,
                      <Button onClick={() => this.deleteCar(id)}>Törlés</Button>]}
                  </ul>
                </Grid>
                <Grid item xs={12}>
                  <div className="comment-container">
                    <form onSubmit={this.submitComment}>
                      <TextField
                        label="Hozzászólás"
                        value={this.state.text}
                        onChange={this.handleChange('text')}
                        margin="normal"
                      />
                      <Button type="submit">Hozzászólok</Button>
                    </form>
                    {this.renderComments()}
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
  getLikesCount,
  deleteCar,
  isCarFromUser,
  fetchComments,
  submitComment,
})(withStyles(styles)(CarDetailsPage));