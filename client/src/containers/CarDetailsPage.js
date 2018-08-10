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
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    if (this.props.auth.id) {
      this.props.isCarFromUser(this.props.match.params.id, this.props.auth.id);
    }
    this.props.getLikesCount(this.props.match.params.id);
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

  handleDeleteCar = (carId) => {
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
    const bigSliderSettings = {
      dots: true,
      fade: true,
      lazyLoad: true,
    };
    const smallSliderSettings = {
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear"
    };

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
                <Grid item xs={12}>
                  <h1 className="title">{marka} - {modell}</h1>
                </Grid>
                <Grid item xs={5}>
                  <Slider className="slider-big" {...bigSliderSettings}>
                    <div>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/2011_Ferrari_458_Italia_DCT_S-A_4.5_Front.jpg/1200px-2011_Ferrari_458_Italia_DCT_S-A_4.5_Front.jpg"/>
                    </div>
                    <div>
                      <img
                        src="https://st.motortrend.com/uploads/sites/10/2015/09/2013-Ferrari-458-Italia-Front-Three-Quarters-View.jpg"/>
                    </div>
                    <div>
                      <img
                        src="https://www.hiroboy.com/thumbnail/1200x1200/userfiles/images/sys/products/124_LB_Performance_Ferrari_458_Detail_up_Transkit__16196.jpeg"/>
                    </div>
                    <div>
                      <img src="data:image/jpeg;base64,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"/>
                    </div>
                    <div>
                      <img src="https://is3-ssl.mzstatic.com/image/thumb/Purple18/v4/a9/6d/70/a96d70df-3417-8d78-8778-d12c7cf226f4/source/256x256bb.jpg"/>
                    </div>
                  </Slider>
                  <Slider className="slider-small" {...smallSliderSettings}>
                    <div>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/2011_Ferrari_458_Italia_DCT_S-A_4.5_Front.jpg/1200px-2011_Ferrari_458_Italia_DCT_S-A_4.5_Front.jpg"/>
                    </div>
                    <div>
                      <img
                        src="https://st.motortrend.com/uploads/sites/10/2015/09/2013-Ferrari-458-Italia-Front-Three-Quarters-View.jpg"/>
                    </div>
                    <div>
                      <img
                        src="https://www.hiroboy.com/thumbnail/1200x1200/userfiles/images/sys/products/124_LB_Performance_Ferrari_458_Detail_up_Transkit__16196.jpeg"/>
                    </div>
                    <div>
                      <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEBAQEBAVEBAWGRYbGBUVEBsQEBAVIB0iIiAdHx8kKDQsJCYxJx8fLUUtMSsuMDAwIys9TT9AQDQ5Q0ABCgoKDg0OGBAPGDcZHx03MjcrKy4rKysrLTcrNzM3KysrNy0rLzU3NzUxMzcxMisxMC0yKystKy0rKzcrNy0rK//AABEIAIAAgAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAEBQIDBgcBAAj/xABCEAACAQIDBQQGBQoGAwAAAAABAgMAEQQFIRIxQVFxBmGBkRMiQqGx0QcyUnLBFBVEYoOSk6Lh8BYjJDPS8UNTsv/EABoBAAIDAQEAAAAAAAAAAAAAAAABAgMEBQb/xAAuEQACAQIEBAQFBQAAAAAAAAAAAQIDEQQSIVETIjFBBTJhkRVCodHxFFJxcoH/2gAMAwEAAhEDEQA/AEOm+wHTSq++9vxqVu7yNe6XHDurIWBCSHQsToOdXMNsEbRseBNCIgB36cqtR7XNvI76QEYcEqE3S9+/5VdHh0Ki4INt9/nVkQvu/wCq+hJIta9K4EPyJgLggHpa9eSYSQgAgG3JRRa4d9ksquB9wsteRl72KEd99n40ZmFheYGHA+K1KMtzAtTiOKYkbK7Y7htN7r0R+Z5G+vh9nvdSnxFGZhlE4xDkgk7R+9VoxLcVFMmyXmoG/VXRyD0vVaZQT7LE9bUXFYHE196E9KsTE2sdkjzFGw5LJvEbfvD51f8AmCUm+ww79pb1DMh2A5MWh2QAQABfvPOvDiALbAINEv2fkIvY6X3snA9a8OTSabv4ifOldAZcAk2NiRewF7kUXDlMrD1YiAeLeqPfUpc4k1KME+4gt86IwOVY7En1Y3YH2muq+Z0NXajB4cgZCTJOic12i7e6rFwkKkKJHduSqF+N+NaTC9ho4btjMUFG/ZjsGHU8PKvcT2owuHuuCgUuNNthtMPH5Xoyti0BMsyGdwGXChV+3MSgHhfXyot44oBsS44XGhTDQi/73zrO5jn2IxBPpZmt9lTsp5ChY04KLnpYCpZBZjRflcH/AI8OZD9rETlv5VsKnHjSpuoii7o4EB8yCffSaIhFLOdnvJ0oP/EmHUkbDznuf0S/An4U8mwXNQ+Zu1wXdurk/wBKr9Mu/eelhWabt0iaLgYh953cnzNWJ9JBOhwWHA7o7U+G9hXRr1UAA7z8KMia262lZfD9vgQC2BjIPEH+lMsL20gY3OGt0Fx8ahKLXYkrDVsS/Cx8aPy6faDXXakFiE2rBxxt31TleZYWcm0eyRvszKV8DRWIjgZR6MODz9U/iKrjHN07DeggxAO029gCSd4Zee0vs/ChpGB4kX8RTiXEq5KuRMU02lJSeLqd48RQ0mCZjeJln/Va0GI89zHrc1HhbDzbhJ/NuBUEIrtzkO1fpf8AAUhzj6QJHukACrwI9T+vw6ViCCxLOSWO8k3Y1IHgB7q1ZSq4RisXLIbyOW46nQdBUFYUxyzJHl1JCLzIufKtNl/ZbDC22ZGbmGC+QtVUsRTi8repYqcmr2MzhMI2wZiLRjW5O+qsXmKRLtHfwUVt8y7Kr6PZgmK7yBKokANiO7nWFzDsBjSSfTROeZ2l91jShV1edpLsOUNFlMvj8xeVrubLwXcBQUmJC7z4U/xHYDHcfRn7slviBQMnYLGf+m/7RP8AlV/HpfuIcOWwgbEEm/8AYq6Obz50wfsZjVv/AKdj0ZT+NVf4cxY/Rpf4ZPwp8am/mXuLJLYlBizoBu94pjh592tL1yXEjfhpv4D/ACphgMoxJts4WY/sXt8KeeO4sr2Nl2VmIixUl9ygX6g0fgMzbTWq8gyLEjAzr6B1ldxoVsdgW5+NGZf2ZkH+6wS3AHab5VljWhDPObtqWODdkinNMqkxDRy4dvR4hD9cMU9Sx4j+9a1OYZQkyoy4hsPIq2NrbD99rb6swkiRgIgDDiANT4ivsRH6xuCBa+7TzrJLHRqc0FoXKi1ozjSg8T5U8yTBIZoUlNme+yvIAE3PW2ledlMoMzsRYhBex+qX9kHuvv6GnmWdin2mnxExGIJBTYPqxkG4J57t3KtOKxVOmmnKzKqdNtp20NEuHCgKosKIijt1q2MWAuNeNtRXpccSB10NeajVad+rOi7dCtiarZzVjODuI86rYUSxUr2HGEStqrK15isXHGLyOqDvaxPQcaR4/tcqAmDCzz29sxGGEdWYaeVWUnUqvQJZY9TQLhzv3DmaAzXM4cOB6RyXO5EF3bp8zWDzftrjJPRiPYQSqSuw23ILGxB0Njv4U5yTs0WImxQJJsdhjdma29/l3a8q31KccNHPXdvTuzOpuo7QQxynHzYlvSCJI8PvDPd3fprblru61oTKEBctsqBckmwA51FYl0vw3DgPCsl9Jea7ECwqbF9WF7XQW08z7jXLhWni8Qow5b7dkaHFUoNvUc4X6TkeZYNlgrEKsrLoTw47utOTP7X1yeY0BriWDk3kALbZII3bRIsP73ac665gMWJIY5FFgwvbkTvHnXQ8VpSpqFm2vUowslK+gY+Nk+1boBQs2MfjI3gxFQkag5ZRqLi/K9YYSk+7NEktjOdm88GEjxM7hmVQhIUAtba2ef6wrTYH6RMFIBeQxnk6lbeO731k8nxWFRZocYWUTIVD7O0oXj+B8KUP2BmKlsNPHiE4NGb6cLrvBrsYnDUalSTqtx2fYw05yUVlSZ1rDZ9h5P8Abmjf7sgb4UauIQ+2B1r8/ZlkOIhsHgkLcxGSt+WmvnaqYsbKontO0TxqCoDldo7QFvKsvwhS1p1L/wCFvHt5o2P0JK6nTaBoYYZN5C/uiuBRdqMRoPymbxkJsfGpntTjlNvyph95Fv8ACqpeBVm9Jr6klioLc76saDcAOgtQuZ4GKeMxSXKG1wCVvbvFcSTtrjh+k3/ZL+AomDt3jbgekU/s9/kah8GxUHeMlp6sl+qpNWdzq2X5HhcPrBCqt9rVn8zrR96BwkzmOMyACQqu0BuD21A8aJVq4taVSUud3aN0IRS5UU/kbsxLzvs8FS0S+JGvvrnfbaX0mYFdWUD0YHPS546aua6YGrjXaCb/AF2JvrZpzqTbQmw8bCu14EnOtKT7Ix492gkMJsvCyGzqNkS2RWuU2QdCN/sjf3VvezbhcOEJ1DPYcbbRP41zRJI3kaR4/RAgEBb+jUnZJseFlJ91GL2ulVBHAgSw1dvXdjz5fGu7jsM69NRXW5gw9RU5Ns6Ri3GyS7iNOLM2wB41lMy7S4aMkQ3mbmPVS/U1jcRiZZjtSyM5/WN7dOVeRwWqmj4ZCK5ncsnipPyjLMM4jYbIi2+8+rbpx+FLEzWVLlACeF9LdDei3wo5VU2FHKurZGQvw/b3EpozuPBrf/VvdVjds0c/5sOHkPOSBGJ/k/GlzYQcq8XKIyCSnlpVboU73y6k1OW4zfOsC1icDB3kH0evQSfhRi5pl7LY4WC3diCh94JrMDJYyTqwHcaHkyZfZc+IvUJYanLrf3Y1VkvwjUM2Vn9GXwxpqWDzbLcO4kjwaF1NwxxBk2TzFxbxrHnKD9v+Wvhk7faB86i8HBqzbt/Z/ckq0lqkvZHQpfpQUX9HAL7tZD/xpbP9I8rbljTwLn41lBkzW9nzNFQZQ1vZHSqYeF4WPSBJ4qq/mGWL7YYpxpM4H6gEfw1rPnEyFnLKzFt5a5bhrfwpvFlZ4sKvGXADVvIVsp0adPyRS/gplOUuruBQMz2BBVQANTckDh0q8QW0ptlfZ6SXVFIX7THZXw5+FabBdjoxYyuXPJdB576k2kKxiYYSSFUEk8ALk1p8m7LMxD4gFE+wPrt8vjWywGXRRraKMJ0Gp6njV7w6X4j4VW5bDsctY1S7UO2IqlsRVxELjFyOVFTSALv17qWwTjjrXmJnB3bqAJ376iTQ5lqBloAIvU1IoL0tTSSgA4OKtSYULhkZ2CICxPAVfmGEMLhWttWBuPhQAdgcHLKf8tTb7R0UeNafLsjjjszgSP3/AFB4Vlou0GI0CyHuAUfKtflM8rRj0wG2eG4gd9QlcaG8L91rVaz24fjVMA3VZM2pqsZbDiLG9r1e01jcDQ91BIdKKRuGlIZwwzVAy1oBgoT7CjxqiXJoj9Vip63q+5AVxSDfuqmSa5pi+Rt7MgPcRahJcnlBtZT0amAKZa8MlGQ5FKx1Kr1a9M4OziCxkkLdw9UUrgIBJTjK8nkksSDGnMjU9BT/AA2BhjtsIoPM6t5mjVk03jzpXA9yzCxxaKNeJOrNRMiRubuiseBIvQcUg1udetXNKN1x53pDC4Qi22QF14ACr1l4+/hSj02ujDzotZNRZhv58N9IBxFPpzNSE5NibXpRJiALWYeJoiHFaDUeYqIxikmtt/OiI2F93ztSk4jhtgHrVxxGgNxbrSGf/9k="/>
                    </div>
                    <div>
                      <img src="https://is3-ssl.mzstatic.com/image/thumb/Purple18/v4/a9/6d/70/a96d70df-3417-8d78-8778-d12c7cf226f4/source/256x256bb.jpg"/>
                    </div>
                  </Slider>
                  {/*<img className={classes.carImg}
                       src={kep ? kep : 'http://maestroselectronics.com/wp-content/uploads/2017/12/No_Image_Available.jpg'}
                       alt={`${marka}-${modell}`}/>*/}
                  <span>Feltöltve:</span>{feltoltve && this.convertUploadTime(feltoltve)}
                  <Button variant="contained" color="primary" onClick={this.incrementLikes}>
                    {likes}<LikeIcon/>
                  </Button>
                </Grid>
                <Grid item xs={6}>
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
                      <Button key="1" onClick={() => this.props.history.push(`/cars/${id}/edit`)}>Szerkesztés</Button>,
                      <Button key="2" onClick={() => this.handleDeleteCar(id)}>Törlés</Button>]}
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