const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="app__footer">
      <p className="footer">
        &copy; {year} pewube.eu | dane pogodowe: openweathermap.org
      </p>
    </footer>
  );
};

export default Footer;
