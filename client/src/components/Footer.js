import React from 'react'
import '../styles/footer.css'

const Footer = () => {
	return (
		<footer class="page-footer" style={{ background: 'black' }}>
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">AutoReact</h5>
                <p class="grey-text text-lighten-4">Mutasd meg kedvenc járműved másoknak is.</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Links</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            	<p class="center-copyright">© 2018 Copyright</p>
            </div>
          </div>
        </footer>
	)
}

export default Footer