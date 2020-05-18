import React, { useState, useEffect } from "react";
import axios from "axios";
import Pdf from "../../editable-stuff/resume.pdf";
import {
  contactHeading,
  aboutDescription,
  showInstaProfilePic,
  instaLink,
  instaUsername,
  instaQuerry,
} from "../../editable-stuff/configurations.json";

const Contact = () => {
  const [instaProfilePic, setInstaProfilePic] = useState("");
  const [showInsta, setShowInsta] = useState(showInstaProfilePic);
  const [resumeURL] = useState(Pdf);

  useEffect(() => {
    if (showInsta) {
      handleRequest();
    }
  }, [showInsta]);

  const handleRequest = (e) => {
    axios
      .get(instaLink + instaUsername + instaQuerry)
      .then((response) => {
        // handle success
        // console.log(response.data.graphql);
        return setInstaProfilePic(
          response.data.graphql.user.profile_pic_url_hd
        );
      })
      .catch((error) => {
        // handle error
        setShowInsta(false);
        return console.error(error.message);
      })
      .finally(() => {
        // always executed
      });
  };

  return (
    <div id="Contact" className="jumbotron jumbotron-fluid m-0">
      <div className="container container-fluid p-5">
        <div className="row">
          {showInsta && (
            <div className="col-5 d-none d-lg-block align-self-center">
              <img
                className="border border-secondary rounded-circle"
                src={instaProfilePic}
                alt="profilepicture"
              />
            </div>
          )}
          <div className={`col-lg-${showInsta ? "7" : "12"}`}>
            <h1 className="display-4 mb-5 text-center">{contactHeading}</h1>
            
            <div className="col-5 d-none d-lg-block align-self-center">
              <!-- Calendly inline widget begin -->
			  <div class="calendly-inline-widget" data-url="https://calendly.com/jefferyjohn/45-minute-meeting" style="min-width:320px;height:750px;"></div>
			  <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>
			  <!-- Calendly inline widget end -->
            </div>

            <p className="lead text-center">{aboutDescription}</p>
            {resumeURL && (
              <p className="lead text-center">
                <a
                  className="btn btn-outline-dark btn-lg"
                  href={Pdf}
                  target="_blank"
                  rel="noreferrer noopener"
                  role="button"
                  aria-label="Resume/CV"
                >
                  Resume
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
