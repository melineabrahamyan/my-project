export const rejectionEmail = (supportEmail: string) => {
  return `
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
        color: #fff !important;
        margin: 0;
        padding: 0;
      }

      .container {
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

      .content {
        width: 100%;
        background-image: url("https://my-project-nine-lime.vercel.app/email-bg.png");
        background-position: center;
        padding: 20px 20px 40px;
        background-size: cover;
        background-repeat: no-repeat;
      }

      .content h2 {
        text-align: center;
        font-weight: bold;
        margin-bottom: 20px;
        color: #fff !important;
      }

      .content p {
        max-width: 560px;
        margin: 0 auto;
        text-align: center;
        margin-bottom: 20px;
        letter-spacing: 1.2px;
        color: #fff !important;
      }

      .contact {
        text-align: center;
        margin: 20px 0;
      }

      .contact a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
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

      <div class="content">
        <h2>We're Sorry!</h2>
        <p>
          Unfortunately, your application as a driver has been declined at this
          time. We appreciate your interest in Freight Match and encourage you
          to apply again in the future.
        </p>
        <p class="contact">
          For further inquiries, feel free to contact us at
          <a href="mailto:${supportEmail}">${supportEmail}</a>.
        </p>
      </div>

      <footer>
        <p>© 2025 Freight Match, Inc. | Privacy Policy | Terms of Service.</p>
      </footer>
    </div>
  </body>
</html>
    `;
};
