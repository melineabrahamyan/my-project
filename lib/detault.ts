export const defaultTemplate = `
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        font-family: Arial, sans-serif;
        color: #ffff !important;
        margin: 0;
        padding: 0;
      }

      .container {
        /* max-width: 600px; */
        width: 100%;
        margin: 0 auto;
      }

      .header {
        width: 100%;
        padding: 13px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #ffaf29;
        overflow-x: hidden;
      }

      .header > h4,
      .header > div {
        flex: 1;
        max-width: 100%;
        width: 100%;
      }

      .header > h4 {
        font-size: 1rem;
        white-space: nowrap;
        color: #002e56;
        letter-spacing: 0.8px;
        text-align: center;
        margin: auto;
      }

      .hero {
        width: 100%;
        background-image: url("https://my-project-nine-lime.vercel.app/email-bg.png");
        background-position: center;
        padding: 20px 20px 40px;
        background-size: cover;
        background-repeat: no-repeat;
      }

      .hero > p {
        max-width: 560px;
        margin: 0 auto;
        text-align: center;
        margin-bottom: 20px;
        letter-spacing: 1.2px;
        color: #ffff !important;
      }

      h2 {
        text-align: center;
        font-weight: bold;
        margin-bottom: 20px;
        color: #ffff !important;
      }

      .features-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
      }

      .features-box {
        margin: auto;
      }

      .feature {
        display: flex;
        align-items: center;
        gap: 10px !important;
        letter-spacing: 0.6px;
        color: #ffff !important;
        margin-bottom: 10px !important;
      }

      .feature > img {
        margin-right: 10px;
      }

      .register {
        width: 100%;
        display: flex;
        justify-content: center !important;
        margin-top: 40px !important;
      }

      .register > a {
        background-color: #fff !important;
        color: #d29227 !important;
        padding: 15px;
        text-decoration: none;
        border-radius: 10px;
        font-weight: bolder;
        width: 100%;
        text-align: center;
        font-size: 18px;
      }

      footer {
        width: 100%;
        padding: 22px 10px;
        text-align: center;
        background-color: #ffaf29;
        color: #111330;
        letter-spacing: 0.5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header class="header">
        <div class="logo">
          <img
            src="https://my-project-nine-lime.vercel.app/logo.png"
            alt="Freight Match"
            width="67"
            height="55"
          />
        </div>
        <h4>Your Partner in Logistics</h4>
        <div></div>
      </header>

      <div class="hero">
        <h2>Join Freight Match Today!</h2>
        <p>
          Freight Match connects you with top brokers and countless freight
          opportunities across the USA. Join today to streamline your logistics
          operations.
        </p>
        <div class="features-container">
          <div class="features-box">
            <div class="feature">
              <img
                src="https://my-project-nine-lime.vercel.app/truck.png"
                alt="matching"
                width="20"
                height="20"
              />
              <span>Efficient Load Matching.</span>
            </div>
            <div class="feature">
              <img
                src="https://my-project-nine-lime.vercel.app/partnership.png"
                alt="partnership"
                width="20"
                height="20"
              />
              <span>Trusted Broker Partnerships.</span>
            </div>
            <div class="feature">
              <img
                src="https://my-project-nine-lime.vercel.app/phone.png"
                alt="support"
                width="20"
                height="20"
              />
              <span>24/7 Support for Carriers.</span>
            </div>

            <div class="register">
             <a href="https://my-project-nine-lime.vercel.app">Register Now</a>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <p>© 2025 Freight Match, Inc. | Privacy Policy | Terms of Service.</p>
      </footer>
    </div>
  </body>
</html>

`;
