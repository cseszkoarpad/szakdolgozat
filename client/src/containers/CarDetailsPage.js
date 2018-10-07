import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteCar, fetchCarById, fetchCarImagesById, getLikesCount, incrementLikes} from '../actions/car';
import {fetchComments, submitComment} from '../actions/comment';
import Loader from '../components/Loader';
import WarningModal from '../components/WarningModal';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import LikeIcon from '@material-ui/icons/ThumbUp';
import SendIcon from '@material-ui/icons/Send';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MailIcon from '@material-ui/icons/MailOutline';

const bigSliderSettings = {
  lazyLoad: true,
};

const smallSliderSettings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
  autoplay: true,
  focusOnSelect: true,
  lazyLoad: true,
};


class CarDetailsPage extends Component {
  state = {
    text: '',
    showDeleteModal: false,
    showInterestModal: false,
    error: null,
  };

  componentWillMount() {
    this.props.fetchCarById(this.props.match.params.id);
    this.props.fetchCarImagesById(this.props.match.params.id);
  }

  componentDidMount() {
    this.props.fetchComments(this.props.match.params.id);
    this.props.getLikesCount(this.props.match.params.id);
  }

  incrementLikes = () => {
    if (!this.props.auth) {
      window.scrollTo(0, 0);
      return this.setState({error: 'A kedveléshez be kell jelentkezni!'});
    }

    this.props.incrementLikes(this.props.match.params.id);
  };

  handleDeleteCar = (carId) => {
    this.props.deleteCar(carId);
    this.props.history.push('/');
  };

  convertPrice = (ar) => {
    if (ar) {
      return (
        <div>
          <span className="font-weight-bold">{ar.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}</span>
          <span className="font-weight-high text--italic"> Ft</span>
        </div>
      );
    }
    return <span className="font-weight-high">Nincs megadva</span>;
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
    let commentsNum = this.props.comments.length;

    return (
      <div className="full-width">
        <h5>{commentsNum} hozzászólás</h5>
        {commentsNum > 0 && this.props.comments.map((comment, i) => {
          return (
            <div className="flex margin-big horizontal--center" key={i}>
              <img className="circle margin-right-medium flex-start" src={comment.profilePic}
                   alt={`${comment.name} profile`}/>
              <div className="flex vertical full-width">
                <div className="flex horizontal--space-between">
                  <span className="font-size-big">{comment.name}</span>
                  <span className="font-size-small">{this.convertUploadTime(comment.feltoltve)}</span>
                </div>
                <p className="font-size-medium">{comment.text}</p>
              </div>
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
    const {text} = this.state;
    if (!this.props.auth) {
      this.setState({error: 'Ehhez a funkcióhoz be kell jelentkezni!'});
      document.documentElement.scrollTop = 0;
      return;
    }

    if (text !== '') {
      this.props.submitComment(this.props.match.params.id, text);
      this.setState({text: ''});
    }
  };

  render() {
    const {cars, auth} = this.props;

    if (cars && Object.keys(cars).length) {
      let {
        id, userId, feltoltve, images, modell, marka, ar, ev, kivitel, km, szin,
        tomeg, uzemanyag, hengerUrtartalom, teljesitmeny, hajtas, valto, leiras, likes,
      } = cars;
      const {text, showDeleteModal, error} = this.state;
      return (
        <div className="car-details-page-wrapper">
          <Paper className="padding-20px">
            {error && this.errorShowUp(error)}
            <div
              className="car-detail-header flex flex-direction--row-reverse flex--wrap horizontal--space-between full-width">
              <h1 className="car-detail-title">{marka} - {modell}</h1>
              {auth.userId === userId &&
              <div className="block align-center">
                <button className="btn btn--secondary margin-side-medium"
                        onClick={() => this.props.history.push(`/cars/${id}/edit`)}>
                  <span className="margin-side-medium">Szerkesztés</span>
                  <EditIcon style={{fontSize: 18}}/>
                </button>
                <button className="btn btn--danger margin-side-medium"
                        onClick={() => this.setState({showDeleteModal: true})}>
                  <span className="margin-side-medium">Törlés</span>
                  <DeleteIcon style={{fontSize: 18}}/>
                </button>
              </div>
              }
            </div>
            <div className="car-details-body">
              <div className="car-details-sliders-wrapper">
                <Slider className="slider-big" ref={slider => (this.slider = slider)} {...bigSliderSettings}>
                  {images && images.length && images.map((img, index) => (
                      <img key={`big-${index}`} src={img.secure_url} alt={`${marka}-${modell}-${index}`}/>
                    ),
                  )}
                </Slider>
                <Slider className="slider-small" {...smallSliderSettings}>
                  {images && images.length && images.map((img, index) => (
                      <img key={index} className="slider-small-image"
                           onClick={() => this.slider.slickGoTo(index)}
                           src={img.secure_url} alt={`${marka}-${modell}-${index}`}/>
                    ),
                  )}
                </Slider>
                <div className="flex horizontal--space-between">
                  <div className="font-size-small">
                    <label className="font-size-13px block font-weight-high">Feltöltve</label>
                    {feltoltve && this.convertUploadTime(feltoltve)}
                  </div>
                  <button className="btn btn--primary" onClick={this.incrementLikes}>
                    <span className="margin-side-small">{likes}</span>
                    <LikeIcon style={{fontSize: 18}}/>
                  </button>
                </div>
              </div>
              <ul className="car-detail-spec-list">
                <li className="car-detail-spec-list-item">
                  <label>Ár </label>
                  {this.convertPrice(ar)}
                </li>
                <li className="car-detail-spec-list-item">
                  <label>Évjárat</label>
                  <b>{ev}</b>
                </li>
                <li className="car-detail-spec-list-item">
                  <label>Kivitel</label>
                  <b>{kivitel}</b>
                </li>
                <li className="car-detail-spec-list-item">
                  <label>Kilométeróra állása</label>
                  <div><b>{km}</b><span className="font-weight-high text--italic"> km</span></div>
                </li>
                <li className="car-detail-spec-list-item">
                  <label>Szín</label>
                  <b>{szin}</b>
                </li>
                <li className="car-detail-spec-list-item">
                  <label>Tömeg</label>
                  <div><b>{tomeg}</b><span className="font-weight-high text--italic"> kg</span></div>
                </li>
                <li className="car-detail-spec-list-item">
                  <label>Üzemanyag</label>
                  <b>{uzemanyag}</b>
                </li>
                <li className="car-detail-spec-list-item">
                  <label>Hengerűrtartalom</label>
                  <div><b>{hengerUrtartalom}</b><span className="font-weight-high text--italic"> cc</span></div>
                </li>
                <li className="car-detail-spec-list-item">
                  <label>Teljesítmény</label>
                  <div><b>{teljesitmeny}</b><span className="font-weight-high text--italic"> le</span></div>
                </li>
                <li className="car-detail-spec-list-item">
                  <label>Hajtás</label>
                  <b>{hajtas}</b>
                </li>
                <li className="car-detail-spec-list-item">
                  <label>Váltó típusa</label>
                  <b>{valto}</b>
                </li>
                <li className="margin-top-big">
                  <label className="font-weight-high">Leírás</label>
                  <p className="text--long font-size-medium">{leiras}</p>
                </li>
                <div style={{display: 'flex', marginTop: '40px'}}>
                  <button onClick={() => this.props.history.push('/kapcsolat')} style={{margin: '0 auto'}}
                          className="btn btn--primary">
                    <span style={{marginRight: '5px'}}>Érdekel</span> <MailIcon/>
                  </button>
                </div>
              </ul>
            </div>
            <form onSubmit={this.submitComment} className="submit-comment-form flex vertical--baseline">
              <TextField
                style={{width: '100%'}}
                label="Hozzászólás"
                value={text}
                multiline
                helperText={!auth && 'A hozzászóláshoz bejelentkezés szükséges'}
                onChange={this.handleChange('text')}
                margin="normal"
              />
              <button type="submit" className="submit-comment-button btn btn--outlined">
                <span className="margin-side-small">Küldés</span>
                <SendIcon style={{fontSize: 18}}/>
              </button>
            </form>
            {this.renderComments()}
          </Paper>
          <WarningModal title={'Biztosan törli?'} desc={'A törlés nem vonható vissza!'} submitButton={'Törlés'}
                        cancelButton={'Mégse'} isOpen={showDeleteModal} deleteCar={() => this.handleDeleteCar(id)}
                        cancelDelete={() => this.setState({showDeleteModal: false})}/>
        </div>
      );
    } else {
      return <Loader/>;
    }
  }
}

const mapStateToProps = ({cars, auth, comments}) => {
  return {
    cars: cars.data,
    auth,
    comments,
  };
};

export default connect(mapStateToProps, {
  fetchCarById,
  fetchCarImagesById,
  incrementLikes,
  getLikesCount,
  deleteCar,
  fetchComments,
  submitComment,
})(CarDetailsPage);